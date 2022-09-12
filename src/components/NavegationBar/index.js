import React, { useContext } from "react";
import FavoriteContext from "../../contexts/favoriteContext"
import * as _ from "./style.css"

const NavegationBar = () => {
  const { favoritePokemons } = useContext(FavoriteContext)
  const logoImage = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
  
  return (
    <nav>
      <div>
        <img 
        src={logoImage}
        alt="PokeAPI Logo"
        className="navbar-img"
        />
      </div>
      <div>
      {favoritePokemons ? favoritePokemons.length : 0} ❤️
      </div>
    </nav>
  )
}

export default NavegationBar