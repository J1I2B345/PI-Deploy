import { useTranslation } from 'react-i18next';
import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createPokemon} from '../redux/actions'
import s from './CreatePokemon.module.css'

export const CreatePokemon = () => {
    const [inputs, setInputs] = useState({});
    const [tipo, setTipo] = useState([])
    const [error, setError] = useState('')

    const pokemons = useSelector (state => state.pokemons)
    const types = useSelector(state => state.types)

    const dispatch = useDispatch()

    const [t, i18next] = useTranslation("global")
    

    const handleChange = (e) => {
        if (e.target.name === 'name'){    
            if (/^[a-z]*$/gi.test(e.target.value)){
                setInputs(prevState => ({ 
                        ...prevState, 
                        [e.target.name]: e.target.value.toLowerCase()})
                )
                setError ('')
            } else {
                setError (t("create.errorName"))
            }
        } else if (e.target.name === 'peso'){
                if (e.target.value > 1000 || e.target.value < 0){ 
                    setError (t('create.errorWeight'))
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
                else setError (t("create.errorHeight"))
        } else if (e.target.name !== 'img' && e.target.name !== 'weight' && e.target.name !== 'height'){
            if (e.target.value >= 0 && e.target.value <=50){ 
                setInputs(
                    prevState => ({ 
                        ...prevState, 
                        [e.target.name]: e.target.value 
                    })
                )
                setError ('')
            } else setError (t("create.errorStats"))
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
        else setError(t("create.errorMoreThanTwoTypes"))}
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
            setError(t("crate.errorNameExist"))
        }
        else if (tipo.length>0 && inputs.name){

        
            let poketipos= tipo.map(e => e.id)
            let poke = {...inputs, tipos: poketipos}
           
            let response = dispatch (createPokemon (poke))
       

            setError(t('create.success'))           
            
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
            setError (t('create.errorNameValid'))
        } else if (tipo.length<=0) setError(t('create.errorType'))
    }

    return <div className={s.container}>
        {t("create.createPokemon")}
        
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            
            <div className={s.input}>
                <div>
                    {inputs.img? <img src={inputs.img} className={s.img}/> : ''} 
                </div>
                
                <div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>{t("create.name")}  
                        </label>
                        <input className={`${s.input} ${s.inputs}`} name='name' placeholder={`${t("create.name")}`} value={inputs.name || ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>{t("create.life")}  
                        </label>
                        <input className={s.input} name='vida' placeholder='0-50' value={inputs.vida || ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}>
                        <label className={s.label}>{t("create.attack")}
                        </label>    
                        <input className={s.input} name= 'ataque' placeholder='0-50' value={inputs.ataque || ''} onChange={handleChange}/>
                    </div> 
                    <div className={s.divLabel}>
                        <label className={s.label}>{t("create.defense")}
                        </label>
                        <input className={s.input} name='defensa' placeholder='0-50' value={inputs.defensa|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>{t("create.speed")}
                        </label>
                        <input className={s.input} name='velocidad' placeholder='0-50' value={inputs.velocidad|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>{t("create.height")}
                        </label>
                        <input className={s.input} name='altura' placeholder='0-20' value={inputs.altura|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}>{t("create.weight")}
                        </label>
                        <input className={s.input} name='peso' placeholder='0-1000' value={inputs.peso|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}> 
                        <label className={s.label}> {t("create.image")}
                        </label>
                        <input className={s.input} name='img' type='url' placeholder={`${t("create.imagePlaceHolder")}`} value={inputs.img|| ''} onChange={handleChange}/>
                    </div>
                    <div className={s.divLabel}>
                        <label className={s.label}> {t("create.type")}</label>
                        <select className={s.select} name='tipo' onChange={handleChangeTipo}>
                            <option name='default' value='default'> {t("create.typeSelect")} </option>
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
               

            <h2 className={s.errorContainer}>{!error ? null : <span className={s.error}>{error}</span>} </h2>      
            <input type='submit' value={`${t('create.create')}`} className={s.button}/>
                    </form>
    </div>
}
