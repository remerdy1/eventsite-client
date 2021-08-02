import React, { useEffect, useState } from "react";
import "./style.css"

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

    // TODO: Handle submit
    // ! Prevent from opening in a new tab
    return (
        <div>
            <form autoComplete="off" method="POST" action="http://localhost:8050/events">
                <select required className="country-input" name="country" defaultValue="Select A Country">
                    <option value="" disabled hidden selected>Select A Country</option>
                    {countries.map(country => <option key={country.name} value={country.alpha2Code}>{country.name}</option>)}
                </select>
                <input type="text" name="city" placeholder="City" className="city-input" required/>
                <button className="search-btn" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search;