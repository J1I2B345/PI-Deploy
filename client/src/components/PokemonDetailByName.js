import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemonQuery} from '../redux/actions';
import {useLocation} from 'react-router-dom';
import s from './PokemonDetail.module.css';
import img from '../img/loading-pokeball.gif';
import { useTranslation } from 'react-i18next';

const PokemonDetailByName = () => {
    const [loading, setLoading] = useState(true)
    const poke = useSelector(state => state.pokemon)

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const name = query.get('name')
    const dispatch = useDispatch()

    const [t] = useTranslation ('global')

    useEffect (
        ()=> {
        dispatch(getPokemonQuery(name))
        if (poke.name === name || poke.error) {
            setLoading(false)
        } else setLoading(true)
        }, [poke]
    )


    if (loading){
        return <img src={img} alt='loading'></img>
    } 
    else if (poke.error){
        return <h1> {poke.error}</h1>
    }

    else {
    return (
        
        
        <div className={s.container}>
        
        {poke?
        <div className={s.div}> 
         <div className={s.divstats}> 
            <p className={s.name}>{poke.name? poke.name.toUpperCase(): poke.name}</p>       
            <div className={s.divtipos}> 
                {poke.tipos? poke.tipos.map((e, i) => {return <span key= {i} className={s[e.name]}> {e.name} </span>}):''}
            </div>   
            <div className={s.divstatscontainer}> 
                <img src={poke.img} alt={`Imagen de pokemon ${poke.name}`} className={s.img}/>
                <div className={s.divstatsconteiner}>     
                <div className={s.divstats1}> 
                        <div className={s.mobile1}> 
                            <p className={s.inputs}>Id: {poke.id}</p>
                            <p className={s.inputs}>{`${t("detail.attack")}`}: {poke.ataque}</p>
                            <p className={s.inputs}>{`${t("detail.life")}`}: {poke.vida}</p>
                            {/* <p className={s.inputs}>{`${t("detail.ataque")}`}: {poke.ataque}</p> */}
                            <p className={s.inputs}>{`${t("detail.defense")}`}: {poke.defensa}</p>
                        </div>
                        
                        <div className={s.mobile2}>
                            <p className={s.inputs}>{`${t("detail.speed")}`}: {poke.velocidad}</p>
                            <p className={s.inputs}>{`${t("detail.height")}`}: {poke.altura}</p>
                            <p className={s.inputs}>{`${t("detail.weight")}`}: {poke.peso}</p>
                        </div>
                    </div>
                </div>
            </div>
     
         </div>
        
         
         {/* <p>  {poke.tipos.map ((e, i) => {
                 return <span key={i} className={s[e.name]}>{e.name}</span>
                 }
             )}    
         </p> */}
        </div> : ''}
    </div>)}
    }


export default PokemonDetailByName

