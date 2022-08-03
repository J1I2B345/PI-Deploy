import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {getPokemonQuery} from '../redux/actions'
import s from './NavBar.module.css';
import img from '../img/pokemon.svg';
import {useTranslation} from 'react-i18next';
import arg from '../img/banderaArg.svg'
import eeuu from '../img/BanderaEEUU.webp'


export const NavBar =() =>{
    const [search, setSearch] = useState('')
    const [t, i18n] = useTranslation("global")

    
    
    function handleEvent(input){
        if (/^[a-z]*$/gi.test(input)){
        setSearch(input.trim())}
    }

    function clicked(e){
        if (search.length>3 ){
        getPokemonQuery(search)
        setSearch('')}
        else {e.preventDefault()}
    }
    
    return (
    <div>
        <div className={s.divFlag}>
            <img className= {s.flag} src={arg} onClick={() => i18n.changeLanguage('es')} alt='arg flag'/>
            <img className= {s.flag} src={eeuu} onClick={() => i18n.changeLanguage('en')} alt='US flag'/>
        </div>
     
        <div className={s.div}>
            <img src ={img} alt='pokemon img' className={s.imgPokemon}/> 
            <ul className={s.ul}> 
                <NavLink to='/home'> <li className={s.li}>{t("nav.home")}</li> </NavLink> 
                <NavLink to='/createpokemon'> <li className={s.li}>{t("nav.createPokemon")} </li> </NavLink>
                <input placeholder={`${t("nav.placeholder")}`} className={s.li} value={search} onChange= {e=> handleEvent(e.target.value)}/> 
                <NavLink to={`/pokemon/Name?name=${search}`} className={s.li}> <button onClick={(e) => clicked(e)}> {t("nav.search")} </button> </NavLink>
            </ul>
        </div> 
    </div>)
}