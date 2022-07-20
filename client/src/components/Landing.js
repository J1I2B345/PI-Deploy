import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import {getAllPokemons, getTypes, getPokemonsApi, getPokemonsDb} from '../redux/actions';
import s from './Landing.module.css';


const Landing = () =>{
    const pokemonsGloba = useSelector(state => state.pokemons)
    const dispatch = useDispatch()
   
    React.useEffect (() => {
      dispatch(getAllPokemons());
      dispatch(getTypes());
      dispatch(getPokemonsApi());
      dispatch(getPokemonsDb())
    }, [pokemonsGloba]
    )

    return (
        <div className={s.landingimg}>
          <Link to='/home'><button className={s.button}/></Link> 
        </div>
    )
}

export default Landing