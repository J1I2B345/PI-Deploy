# Henry

# POKEMON PI
![pokemon](https://user-images.githubusercontent.com/103390530/185762057-2273e910-72c0-477d-9cb0-6636ebf26caf.png)


## Introduction

This is a project done as a first assigment in wich join all the technologies learned at SoyHenry bootcamp.

## Project Objetives

- Build a JavaScript App from scratch
- Afirm and conect all the learned concepts in the Carreer

## Stack of Technologies

### Front End:

HTML, CSS, Javascript, React, Redux

https://pi-deploy.vercel.app/

### Back End:

Node.js, Express, Sequelize.

https://pokemon-pi-henry-v1.herokuapp.com/

### Database:

PostgreSQL

## **Starting Instructions**

**IMPORTANT:** Necesary version of node and NPM

- **Node**: 12.18.3 or higher
- **NPM**: 6.14.16 or higher

## BoilerPlate

The boilerPlate has two folders: `api` and `client`.

Inside `api` you must have to create a file called: `.env`
that has the following form:

```
DB_USER=postgresuser
DB_PASSWORD=postgrespassword
DB_HOST=localhost
PORT=3001
```

You have to replace `postgresuser` and `postgrespassword` with your own credentials to connect to postgres database. This file will be ignored by github, as it contains sensitive information (the credentials)

## Next

### _Connect the data base_

- Go to your postgres database manager and create a new database called `pokemon`, this is the name of the database to which we will connect.

### _Install the necesary package to run it_

- Open the project console
  - Inside `api` folder, run the command line, `npm install`
  - Inside `client` folder, run the command line, `npm install`

### _Run the project_

- Open the project console

  - Inside `api` folder, run the command line, `npm start`
  - Inside `client` folder, run the command line, `npm start` (go to http://localhost:3000/)

# Project Screens

- Landing-Page
![LandingPI](https://user-images.githubusercontent.com/103390530/185762085-12e5f44b-6d9b-4c3f-9030-54ed50219197.png)

- Loading gif
![LoadingPIPokemon](https://user-images.githubusercontent.com/103390530/185762133-5283a35f-bfd4-4ad5-8a57-5320f3787d04.png)
- Catalogue with Pokémons
![HomePIPokemon](https://user-images.githubusercontent.com/103390530/185762144-e72ed078-e8fa-47a6-8643-b58fae18d378.png)
- Filter the Pokémons
![FilterPIPokemon](https://user-images.githubusercontent.com/103390530/185762186-4f12dcb7-d604-4452-8c47-b1076496931c.png)
- Pokemon in detail
![PokemonDetailPIPokemon](https://user-images.githubusercontent.com/103390530/185762195-e1673b0a-9be6-425f-b2e9-58df74029f0e.png)
- Create a Pokémon!
![CreatePokemonPIPokemon](https://user-images.githubusercontent.com/103390530/185762241-203c24c3-b474-446e-8124-b0a0c008e0fe.png)
- Change language
![changeLanguagePIPokemon](https://user-images.githubusercontent.com/103390530/185762257-22f8eb1e-54f8-403d-a0a6-69cb77955ed0.png)

