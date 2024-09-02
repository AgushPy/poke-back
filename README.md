## Description

App Backend for save parties & pokemons and battle's of the pokemons

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
$ npm run start
```

## Up run

when you start app using routes :
http://localhost:8080

## Aviable routes

get pokemons :
http://localhost:8080/api/pokemon/all

get parties :
http://localhost:8080/api/party/all

init battle (Post method):
http://localhost:8080/api/party/battle

example request:
```curl
body:
{
  "pokemonPlayer": {
    "type": "Type",
    "id": "pokemon-5",
    "name": "Eevee",
    "attack": 4,
    "defense": 3,
    "hp": 4,
    "speed": 5,
    "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png"
  },
  "pokemonCpu": {
    "type": "Type",
    "id": "pokemon-1",
    "name": "Pikachu",
    "attack": 4,
    "defense": 3,
    "hp": 3,
    "speed": 6,
    "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
  }
}
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
