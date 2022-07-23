import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {NavBar} from './components/NavBar';
import Landing from './components/Landing'
import Pokemons from './components/Pokemons';
import PokemonDetailById from './components/PokemonDetailById';
import { CreatePokemon } from './components/CreatePokemon';
import PokemonDetailByName from './components/PokemonDetailByName';




function App () {

  return (
    <div className="App">
       
          <Route exact path='/' component={Landing} />
          <Route path={['/home', '/pokemon/Name', '/pokemon/Id/:id', '/createpokemon']} component={NavBar} />
          <Route exact path='/home' component={Pokemons}/>
          <Route exact path='/pokemon/Name' component={PokemonDetailByName}/> 
          <Route exact path='/pokemon/Id/:id' component={PokemonDetailById} />
          <Route path='/createpokemon' component={CreatePokemon} />
    
    </div>
  );
}

export default App;
