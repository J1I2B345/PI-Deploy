const { Router } = require('express');
const fetch = require('node-fetch')
const {Pokemon, Tipo} = require ('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons', async (req, res)=>{
    try {
         let {name} = req.query
         if (name){
            let pokesDbByName = await Pokemon.findOne({
                include: Tipo,
                where:{
                    name: name
                }
            })
            
            let pokesApiByName= await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`)
                                 .then (data => data.json())
                                 .then (data => {
                                     return {
                                         name: data.name, 
                                         id: data.id, 
                                         tipos: data.types.map(e=> {return e.type}), 
                                         img: data.sprites.other.dream_world.front_default, 
                                         ataque: data.stats[1].base_stat, 
                                         vida: data.stats[0].base_stat, 
                                         defensa: data.stats[2].base_stat, 
                                         velocidad: data.stats[5].base_stat, 
                                         peso: data.weight, 
                                         altura: data.height}
                                     })
                                 .catch (e => {return {error: 'No se encontró pokemon con el nombre proporcionado'}})
                    
             if (pokesDbByName && !pokesApiByName.hasOwnProperty("error")){
                 return res.status(200).json(pokesDbByName.concat(pokesApiByName))
             } if (pokesDbByName){
                 return res.status(200).json(pokesDbByName)
             } if (!pokesApiByName.hasOwnProperty("error")){
                 return res.status(200).json(pokesApiByName)
             } else {
                 return res.status(400).json({error: 'No se encontró pokemon con el nombre proporcionado'})
             }
         }
    

        let pokemonsDb = await Pokemon.findAll(
            {include: Tipo}
        )
                        
                    
        let pokeData = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=40')
                                .then (response => response.json())
                                .then (data => data.results)
                                .catch( err=> err.message)
        let pokesUrl = pokeData.map(async (e)=>{ return await fetch(e.url).then(data => data.json())})
        let pokemonsApi
        Promise.all(pokesUrl)
            .then(data => pokemonsApi = data.map( e=> {return {name: e.name, id: e.id, tipos: e.types.map( e => {return e.type}), img: e.sprites.other.dream_world.front_default, ataque: e.stats[1].base_stat}}))
            
            .then (data => res.status(200).json ([...pokemonsApi, ...pokemonsDb]))
            // .then (data => res.status(200).json ({ 'pokemons api': [...pokemonsApi], 'pokemonsDB': [...pokemonsDb]}))
            .catch (err => console.log (err.message))   
    }
    catch (e){
       return  res.status(400).json(e.message)
    }
})

router.get ('/pokemons/:id', async (req,res)=> {
    try {
        let {id}= req.params
        if (id.length > 4){
            let poke = await Pokemon.findOne({
                include: Tipo,
                where:{
                    id: id
                }
            }
            )

            return res.json(poke)
        } else {
            let poke = await  fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
                                    .then(data => data.json())
                                    .then(data => {
                                        return {
                                            name: data.name, 
                                            id: data.id, 
                                            tipos: data.types.map(e=> {return e.type}), 
                                            img: data.sprites.other.dream_world.front_default, 
                                            ataque: data.stats[1].base_stat, 
                                            vida: data.stats[0].base_stat, 
                                            defensa: data.stats[2].base_stat, 
                                            velocidad: data.stats[5].base_stat, 
                                            peso: data.weight, 
                                            altura: data.height}
                                        })
                                        .catch (e=> e.message)
            return res.json(poke)
        }
    }
    catch (e){
        return res.status(400).json(e.message)
    }
})

router.post ('/pokemons', async (req,res) =>{
   try {
        let {name, vida, ataque, defensa, velocidad, altura, peso, img, tipos} = req.body
        
        let pokemon = await Pokemon.create ({name, vida, ataque, defensa, velocidad, altura, peso, img})
    


        await pokemon.addTipo(tipos)


        let pokemonConTipos= await Pokemon.findOne({
            include: Tipo,
            where:{
                name: name
            }
        })


        return res.status(201).json(pokemonConTipos)
    }
    catch(e){
        res.status(400).json(e.message)
    }
}

)

router.get ('/types', async (req,res) =>{
  try { let tiposDb = await Tipo.findAll()
        if (tiposDb.length === 0) {
            let types = await fetch ('https://pokeapi.co/api/v2/type')
                    .then(data => data.json())
                    .then(data=> data.results)
            await Tipo.bulkCreate (types)
         
            return res.json (types)
        }
        else {
         
            return res.json(tiposDb)
        }
    }
catch(e){
    res.status(400).json(e.message)
    }
})






router.get('/pokemon/api', async(req, res)=>{
    try {
        let pokeData = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=40')
                                .then (response => response.json())
                                .then (data => data.results)
                                .catch( err=> err.message)
        let pokesUrl = pokeData.map(async (e)=>{ return await fetch(e.url).then(data => data.json())})
        let pokemonsApi
        Promise.all(pokesUrl)
            .then(data => pokemonsApi = data.map( e=> {return {name: e.name, id: e.id, ataque: e.stats[1].base_stat, tipos: e.types.map( e => {return e.type}), img: e.sprites.other.dream_world.front_default}}))
            .then (data => res.status(200).json (pokemonsApi))
            .catch (err => console.log (err.message))        
    }
    catch (e){
       return  res.status(400).json(e.message)
    }
}
)



router.get('/pokemon/db', async (req,res)=>{
    try {
        let pokemonsDb = await Pokemon.findAll({
            include: Tipo,
        })
        res.json(pokemonsDb)
        }
    catch(e){
        res.status(400).json(e.message)
    }
})


module.exports = router;



