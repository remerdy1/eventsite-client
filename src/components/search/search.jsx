import React from "react";
import "./style.css"

const Search = () =>{
    return (
        <div>
            <form autoComplete="off">
                <input type="text" name="city" placeholder="City" className="city-input"/>
                <button className="search-btn">Search</button>
            </form>
        </div>
    )
}

export default Search;