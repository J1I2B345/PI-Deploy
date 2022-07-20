import axios from 'axios';



export const getAllPokemons = () => (dispatch) => {
    axios.get ('/pokemons')
    .then (data => dispatch ({
        type: 'GET_ALL_POKEMONS',
        payload: data.data
    }))
}

export const getPokemon = (id) => (dispatch) =>{
    axios.get (`/pokemons/${id}`)
    .then (data => dispatch({
        type: 'GET_POKEMON',
        payload: data.data
    }))
}


export const getPokemonsApi = () => (dispatch) => {
    axios.get ('/pokemon/api')
    .then (data => dispatch({
        type: 'GET_POKEMONS_API',
        payload: data.data
    }))
}

export const getPokemonsDb= () =>(dispatch)=>{
    axios.get('/pokemon/db')
    .then( data => dispatch({
        type: 'GET_POKEMONS_DB',
        payload: data.data
    }))
}



export const getPokemonQuery = (query) => (dispatch) => {
    axios.get (`/pokemons?name=${query}`)
    .then (data => dispatch({
        type: 'GET_POKEMON_QUERY',
        payload: data.data
    }))
}

export function getTypes() {
    return function (dispatch){
    axios.get ('/types')
    .then (d => dispatch({
        type: 'GET_TYPES',
        payload: d.data
    }))}
}

export function createPokemon(poke){
    return function (dispatch){
    axios.post('/pokemons', poke)
    .then (d => dispatch ({
        type: 'CREATE_POKEMON',
        payload: d.data
    }))}
}


// export function filterByName (order){
//     return function(dispatch){
        
//     }
// }