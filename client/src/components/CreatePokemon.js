import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getTypes, createPokemon} from '../redux/actions'
import s from './CreatePokemon.module.css'

export const CreatePokemon = () => {
    const [inputs, setInputs] = useState({});
    const [tipo, setTipo] = useState([])
    const [error, setError] = useState('')
    
    const pokemons = useSelector (state => state.pokemons)
    const types = useSelector(state => state.types)

    const dispatch = useDispatch()
    

    const handleChange = (e) => {
        if (e.target.name === 'name'){    
            if (/^[a-z]*$/gi.test(e.target.value)){
                setInputs(prevState => ({ 
                        ...prevState, 
                        [e.target.name]: e.target.value.toLowerCase()})
                )
                setError ('')
            } else {
                setError ('Ingrese un nombre que sea solo letras')
            }
        } else if (e.target.name === 'peso'){
                if (e.target.value > 1000 || e.target.value < 0){ 
                    setError ('Ingrese un valor entre 0 y 1000')
                }
                else {
                    setInputs(
                        prevState => ({ 
                            ...prevState, 
                            [e.target.name]: e.target.value }
                        )
                    )
                    setError ('')
                }
        } else if (e.target.name === 'altura'){
                if (e.target.value >= 0 && e.target.value <= 20){
                    setInputs(
                        prevState => ({ 
                            ...prevState, 
                            [e.target.name]: e.target.value }
                        )
                    )
                    setError ('')
                }
                else setError ('Ingrese un valor entre 0 y 20')
        } else if (e.target.name !== 'img' && e.target.name !== 'weight' && e.target.name !== 'height'){
            if (e.target.value >= 0 && e.target.value <=50){ 
                setInputs(
                    prevState => ({ 
                        ...prevState, 
                        [e.target.name]: e.target.value 
                    })
                )
                setError ('')
            } else setError ('Ingrese un valor entre 0 y 50')
        } else setInputs(
            prevState => ({ 
                ...prevState, 
                [e.target.name]: e.target.value 
            })
        )
    }
    
    const handleChangeTipo = (e) => {
        if (!tipo.find(element => element.id === e.target.selectedOptions[0].id) && e.target.value!== 'default'){
        if(tipo.length<2){
            setError('')
            setTipo([...tipo, {name: e.target.value, id: e.target.selectedOptions[0].id}])}
        else setError('seleccione hasta dos tipos')}
    }

    const handleClick = (e) => {
        e.preventDefault(); 
        let type = e.target.innerHTML.trim()
        let newTipo= tipo.filter(el=> el.name !== type)
        setTipo(newTipo)
    }
    

    const handleSubmit=  (e) => {
        e.preventDefault()
        if (pokemons.find(e=> e.name === inputs.name)){
            setError('Ya existe un Pókemon con ese nombre')
        }
        else if (tipo.length>0 && inputs.name){

        
            let poketipos= tipo.map(e => e.id)
            let poke = {...inputs, tipos: poketipos}
           
            let response = dispatch (createPokemon (poke))
       

            setError('Su pokemon ha sido creado exitosamente')           
            
            setInputs({
                        name: '',
                        vida: '',
                        ataque: '',
                        defensa: '',
                        velocidad: '',
                        altura: '',
                        peso: '',
                        img: ''
                    }
            )
            setTipo([])
        } else if(!inputs.name){
            setError ('Debe ingresar un nombre válido')
        } else if (tipo.length<=0) setError('Seleccione al menos un tipo')
    }

    return <div className={s.container}>
        Create your own Pokémon!
        
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            
            <div className={s.input}>
                <div>
                    {inputs.img? <img src={inputs.img} className={s.img}/> : ''} 
                </div>
                
                <div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>Nombre  
                        </label>
                        <input className={`${s.input} ${s.inputs}`} name='name' placeholder='nombre' value={inputs.name || ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>Vida
                        </label>
                        <input className={s.input} name='vida' placeholder='vida' value={inputs.vida || ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}>
                        <label className={s.label}>Ataque
                        </label>    
                        <input className={s.input} name= 'ataque' placeholder='ataque'value={inputs.ataque || ''} onChange={handleChange}/>
                    </div> 
                    <div className={s.divLabel}>
                        <label className={s.label}>Defensa
                        </label>
                        <input className={s.input} name='defensa' placeholder='defensa'value={inputs.defensa|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>Velocidad
                        </label>
                        <input className={s.input} name='velocidad' placeholder='velocidad' value={inputs.velocidad|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>Altura
                        </label>
                        <input className={s.input} name='altura' placeholder='altura' value={inputs.altura|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>Peso
                        </label>
                        <input className={s.input} name='peso' placeholder='peso' value={inputs.peso|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}> Imagen
                        </label>
                        <input className={s.input} name='img' type='url' placeholder='inserte URL de la imagen' value={inputs.img|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}>
                        <label className={s.label}> Tipo</label>
                        <select className={s.select} name='tipo' onChange={handleChangeTipo}>
                            <option name='default' value='default'> Seleccione un tipo </option>
                            {types.map(e => {
                                return <option name={e.name} key={e.id} id={e.id} value= {e.name || ''}> {`${e.name}`}</option>
                            })}
                        </select>
                    </div> 
                </div> 
            </div>
            
            <div className={s.divTiposSeleccionados}>     
                {tipo.length>0? tipo.map(e=> {return <p className ={s[e.name]} name={e.name} key= {e.id} value={e.name} onClick={handleClick}> {e.name}</p>}) : ''}
            </div>
                   
                   
                        
               
             




            <h1>{!error ? null : <span>{error}</span>} </h1>      
            <input type='submit' value='Enviar'/>
                    </form>
    </div>
}
