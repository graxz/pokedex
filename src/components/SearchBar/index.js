import React, { useState } from "react";
import * as _ from "./style.css"

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("")
  const { onSearch } = props

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value)

    if (event.target.value.length === 0) {
      onSearch(undefined)
    }
  }

  const onButtonClickHandler = () => {
    onSearch(searchValue)
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input 
        placeholder="Buscar pokemon" 
        type="search" 
        onChange={onChangeHandler} 
        />
      </div>
      <div className="searchbar-btn">
        <button onClick={onButtonClickHandler}>
          Buscar
        </button>
      </div>
    </div>
  )
}

export default SearchBar