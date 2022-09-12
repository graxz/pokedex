import './App.css';
import { useEffect, useState } from 'react'

import NavegationBar from './components/NavegationBar'
import Pokedex from './components/Pokedex'
import SearchBar from './components/SearchBar'

import { FavoriteProvider } from './contexts/favoriteContext'

import { getAllPokemons, getPokemonData, searchPokemon } from './services/api'

const favoritesKey = "f"

function App() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [notFound, setNotFound] = useState(false)

  const itensPerPage = 25

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      
      const data = await getAllPokemons(itensPerPage, itensPerPage * page)
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)

      setPokemons(results)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (err) {
      console.log(`Fetch Pokemons failed: ${err.message}`);
    }
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey))
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  useEffect(() => {
    fetchPokemons()
  }, [page])

  const updateFavoritePokemons = (pokemonName) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(pokemonName)
    
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1)
    } else {
      updatedFavorites.push(pokemonName)
    }

    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites)
  }

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }

    setLoading(true)
    setNotFound(false)

    const result = await searchPokemon(pokemon)

    if (!result) {
      setLoading(false)
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }

    setLoading(false)
  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemon: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <NavegationBar />
        <SearchBar
          onSearch={onSearchHandler}
        />
        {notFound ? (
          <div className='not-found-text'>
            Não foi encontrado nenhum pokemon com esse nome!
          </div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </FavoriteProvider>
  );
}

export default App;
