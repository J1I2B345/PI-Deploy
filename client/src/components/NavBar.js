import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {getPokemonQuery} from '../redux/actions'
import s from './NavBar.module.css';
import img from '../img/pokemon.svg';
export const NavBar =() =>{
    const [search, setSearch] = useState('')
    
    
    function handleEvent(input){
        setSearch(input)}


    function clicked(searchValue){
        getPokemonQuery(searchValue)
        setSearch('')
    }
    
    return <div className={s.div}>
        <img src ={img} alt='imagen pokemon' className={s.imgPokemon}/> 
        <ul className={s.ul}> 
            <NavLink to='/home'> <li className={s.li}>Home</li> </NavLink> 
            <NavLink to='/createpokemon'> <li className={s.li}>Create Pokemon </li> </NavLink>
            <input placeholder='Ingrese nombre de pokemon' className={s.li} value={search} onChange= {e=> handleEvent(e.target.value)}/> 
            <NavLink to={`/pokemon/Name?name=${search}`} className={s.li}> <button onClick={(e) => clicked(search)}> Buscar </button> </NavLink>
        </ul>
    </div>
}