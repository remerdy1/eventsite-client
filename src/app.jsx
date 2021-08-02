import React from 'react';

import Header from "./components/header/header"
import Search from "./components/search/search"

function App(){
    // Make request to restcountries
    const fetchCountries = async () =>{
        const countries = await (await fetch("https://restcountries.eu/rest/v2/all")).json();
        return countries
    }

    return (
        <div>         
            <Header />
            <Search fetchCountries={fetchCountries} />
        </div>
    )
}

export default App;