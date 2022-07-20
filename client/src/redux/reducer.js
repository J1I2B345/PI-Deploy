const initialState = {
    pokemons: [],
    pokemon: {},
    types: [],
    pokemonsApi: [],
    pokemonsDb: []
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'GET_POKEMONS_API':
            return {
                ...state,
                pokemonsApi: action.payload
            }
        case 'GET_POKEMONS_DB':
            return {
                ...state,
                pokemonsDb: action.payload
            }
        case 'GET_POKEMON':
            return {
                ...state,
                pokemon: action.payload
            }
        case 'GET_POKEMON_QUERY':
            return {
                ...state,
                pokemon: action.payload
            }       
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'CREATE_POKEMON':
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                pokemonsDb: [...state.pokemonsDb, action.payload]
            } 
        default: 
            return state
        }
}


//axios.post('https:sample-endpoint.com/user', {
//     Name: 'Fred',
//     Age: '23'
//   })
//   .then(function (response) {
//     console.log(response);
//   })