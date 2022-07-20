import React, {useState} from 'react';
import {useDispatch, useSelector } from "react-redux";
import Pokemon from './Pokemon';
import Pagination from './Pagination';
import {getAllPokemons, getPokemonsApi, getPokemonsDb} from '../redux/actions';
import s from './Pokemons.module.css';
import img from '../img/loading-pokeball.gif';

const Pokemons = (props) => {
    const [loading, setLoading]= useState(true)
    const [pokesPerPage] = useState(12)
    const [currentPage, setCurrentPage] = useState (1)
    const [poke, setPoke]= useState([]) 
    const [tipoBuscado, setTipoBuscado] = useState([]) 
    
    // const dispatch = useDispatch()
    
    const pokemonsGloba = useSelector(state => state.pokemons)    
    const types = useSelector (state => state.types)
    const pokeApi= useSelector (state => state.pokemonsApi)
    const pokesDb= useSelector (state => state.pokemonsDb)
    
   
    React.useEffect (() => {
        if (pokemonsGloba.length !== 0){
            setLoading(false)
        }
        setPoke(pokemonsGloba)
    }, [pokemonsGloba]
    )

  
    

    if (loading){
        return <img src={img} alt='loading'></img>
    } 
    else {
  
    //pagination
    const changePage = (page) => setCurrentPage (page)
    const indexOfLastPoke = currentPage * pokesPerPage;
    const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
    const currentPoke = poke.slice(indexOfFirstPoke, indexOfLastPoke)

    const changeApiDb = (value) => {
        if (value === 't'){
            setPoke(pokemonsGloba)
        }
        else if (value === 'a'){
            setPoke(pokeApi)        
        }
        else if (value === 'c'){
            setPoke(pokesDb)    
        }
            setCurrentPage(1)
    }

    const changeOrder= async (value)=>{
        let pokesort = [...poke]
        // if (value==='orden'){
        //     setPoke(pokemonsGloba)
        // }
        
        if (value === 'a-z'){
            pokesort.sort((a,b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1
                }
                else if (a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1
                }
                else return 0
            })
        }
        else if (value === 'z-a'){
                pokesort.sort((a,b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()){
                        return 1
                    }
                    else if (a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1
                    }
                    else return 0
                }) 
        }
        else if (value ==='+a'){
            pokesort.sort((a,b) => {
                if (a.ataque < b.ataque){
                    return 1
                }
                else if (a.ataque > b.ataque){
                    return -1
                }
                else return 0
            })
        }
        else if (value ==='-a'){
            pokesort.sort((a,b) => {
                if (a.ataque > b.ataque){
                    return 1
                }
                else if (a.ataque < b.ataque){
                    return -1
                }
                else return 0
            })
        }
        setPoke(pokesort) 
        setCurrentPage(1)
    }

    const handleClick = (e) => {
        e.preventDefault();    
        let type = e.target.innerHTML.trim()

        let newTipo= tipoBuscado.filter(el=> el !== type)

        if (newTipo.length == 0){
            setTipoBuscado(newTipo)
            setPoke(pokemonsGloba)
        } else {
            let pokesort= [...pokemonsGloba]
            let newPoke= []
            setTipoBuscado(newTipo)
            pokesort.forEach(e  => {
                e.tipos.forEach(el => {
                    if (el.name === newTipo[0]){
                        newPoke.push(e)
                    }
                })
            })
            setPoke(newPoke)
        }
    }

    const selectType = (value) =>{
        let pokesort = [...poke]
        if (tipoBuscado.length<2){
            if (value !== 'tipo') {
                let newPoke = []
                if (tipoBuscado.length> 0 && tipoBuscado.find(e=> e === value)){
                    console.log( 'ya esta agregado')
                }
                else {
                    setTipoBuscado([...tipoBuscado, value])
                    pokesort.forEach(e => {
                    e.tipos.forEach(el => {
                        if (el.name === value){
                            newPoke.push(e)
                        }
                    })
                })
                setPoke(newPoke)
                setCurrentPage(1)}
            }
        }
    }

    
    return (
        <div className={s.divcontainer}>
            
            <div className={s.navContainer}> 
                <nav className={`${s.nav}, ${s.tipos}`}> 
                    <select className={s.select} onChange= {(e)=> changeApiDb(e.target.value)}> 
                        <option value={'t'}>todos</option>
                        <option value={'a'}>api</option>
                        <option value={'c'}>creados</option>
                    </select>
                    <select id='selectOrder' className={s.select} onChange={(e) => changeOrder(e.target.value)}>
                        <option value={'orden'}> orden </option>
                        <option value={'a-z'}> a-z </option>
                        <option value={'z-a'}> z-a </option>
                        <option value={'+a'}> mayor ataque</option>
                        <option value={'-a'}> menor ataque</option>
                    </select> 
                    <select id='selectType' className={s.select} onChange= {(e) => selectType(e.target.value)}> 
                        <option value ={'tipo'}> tipo </option>
                                {types.map(e => {
                                    return <option name={e.name} key={e.id} id={e.id} value= {e.name || ''}> {`${e.name}`}</option>
                                })}
                    </select>          
                </nav>
                <div className={s.tipos}>
                        {tipoBuscado.length>0? tipoBuscado.map(e=> {return <span className={`${s[e]}`} name={e} key= {e} value={e} onClick={handleClick}> {e}</span>}) : ''}
                </div>
            </div>


            {poke.length>0? <Pagination pokesPerPage ={pokesPerPage} totalPokes={poke.length} changePage={changePage}/>
            : ''}
            <div className={s.divPokes}> {poke.length? currentPoke.map((e, i) => {return <Pokemon name={e.name} id={e.id} key={e.id} img={e.img} ataque={e.ataque} tipos={e.tipos} i={i}/>})  : <h1> No se encontraron pokémons</h1>}
                {/* {currentPoke.map(e => { return <Pokemon name={e.name} id={e.id} key={e.id} img={e.img} ataque={e.ataque} />})}  */}
            </div>  
             
        </div>
        )

                            }


}

export default Pokemons








// probando cosas. que cuando le haces click saque el tipo de la lista y vuelva a hacer el 
// filtro con los que quedan.
// un for para recorrer el objeto que tiene los tipos y lo mismo que hago para filtrar en primer lugar.
//terminé haciendolo más simple porque los pokemons solo tienen máximo dos tipos.


    // const handleClick = (e) => {
    //     e.preventDefault(); 
    //     setPoke(pokemonsGloba)   
    //     let type = e.target.innerHTML.trim()
    
    //     let newTipo= tipoBuscado.filter(el=> el.name !== type)
    //     //setPoke(pokemonsGloba)

    //     if (newTipo.length === 0){
    //         setTipoBuscado([])
    //         setPoke(pokemonsGloba)
    //     } else {
    //         setTipoBuscado(newTipo)
    //         let pokesFiltrados = []
    //             for ( let i = 0; i< tipoBuscado.length; i++){
                    
                    
    //                 if (pokesFiltrados.length !== 0){
    //                     let pokesFiltrados2 = []
    //                     pokesFiltrados.forEach(e => {
    //                         e.tipos.forEach(el => {
    //                             if (el.name === tipoBuscado[i]){
    //                                 pokesFiltrados2.push(e)
    //                             }
    //                             })
    //                         })
    //                     if (pokesFiltrados2.length>0){
    //                         pokesFiltrados = pokesFiltrados2
    //                     }
    //                     console.log ('pokes filstrados en caso de que pokes filtrados tenga algo', pokesFiltrados, 'pokes filtrados 2,', pokesFiltrados2)
    //                 }
    //                 else {
    //                     poke.forEach(e => {
    //                     e.tipos.forEach(el => {
    //                         if (el.name === tipoBuscado[i]){
    //                             pokesFiltrados.push(e)
    //                         }
    //                         })
    //                     })
    //                 }
    //             }
    //         if (pokesFiltrados.length !== 0){
    //             setPoke(pokesFiltrados)
    //         }
    //         else (setPoke('error'))
    //     }
    // }