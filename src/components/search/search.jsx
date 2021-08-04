import React, { useEffect, useState } from "react";
import "./search.css"

function Search(props){
    const [countries, setCountries] = useState([])
    const {fetchCountries} = props;

    // Fetch list of countries once page has rendered
    useEffect(() =>{
        const fetchData = async () => {
            setCountries(await fetchCountries());
        }
        fetchData()
    }, [fetchCountries])
    
    return (
        <div>
            <form autoComplete="off" onSubmit={props.handleSubmit}>
                <select required className="country-input" name="country" defaultValue="Select A Country">
                    <option value="" disabled hidden selected>Select A Country</option>
                    {countries.map(country => <option key={country.name} value={country.alpha2Code}>{country.name}</option>)}
                </select>
                <input type="text" name="city" placeholder="City" className="city-input" required/>
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search;