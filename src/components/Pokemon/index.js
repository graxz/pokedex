import React, { useContext } from "react";
import FavoriteContext from "../../contexts/favoriteContext"
import * as _ from "./style.css"

const Pokemon = (props) => {
  const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)
  const { pokemon } = props
  const heart = favoritePokemons && favoritePokemons.includes(pokemon.name) ? "❤️" : "🖤"

  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name)
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <div>#{pokemon.id}</div>
        <img 
          alt={pokemon.name} 
          src={pokemon.sprites.front_default}
          className="pokemon-image"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <button
            className="pokemon-heart-btn"
            onClick={onHeartClick}
          >
            {heart}
          </button>
        </div>
        <div className="card-bottom">
          <div className="card-type">
            {pokemon.types.map((type, index) => {
              return (
                <div key={index} className="pokemon-type-text">
                  <strong>{type.type.name}</strong>
                </div>
              )
            })}
          </div>
          <div className="card-hp"><strong>HP:</strong>{pokemon.stats[0].base_stat}</div>
          <div className="card-attack"><strong>Attack:</strong>{pokemon.stats[1].base_stat}</div>
          <div className="card-defense"><strong>Defense:</strong>{pokemon.stats[2].base_stat}</div>
        </div>
      </div>
    </div>
  )
}

export default Pokemon
