const urlPokeApi = "https://pokeapi.co/api/v2/pokemon"

const searchPokemon = async (pokemonName) => {
  try {
    const url = `${urlPokeApi}/${pokemonName.toLowerCase()}`

    const response = await fetch(url)

    return await response.json()
  } catch (err) {
    console.log(err);
  }
}

const getAllPokemons = async (limit = 50, offset = 0) => {
  try {
    const url = `${urlPokeApi}?limit=${limit}&offset=${offset}`

    const response = await fetch(url)

    return await response.json()
  } catch (err) {
    console.log(err);
  }
}

const getPokemonData = async (url) => {
  try {
    const response = await fetch(url)

    return await response.json()
  } catch (err) {
    console.log(err);
  }
}

export {
  searchPokemon,
  getAllPokemons,
  getPokemonData
}