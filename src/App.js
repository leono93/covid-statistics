import React, { useState, useEffect } from 'react';
import './App.css';
import{ MenuItem, FormControl, Select } from "@material-ui/core";
import Info from './Info';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['Global']);

useEffect(() => {
  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ));

      setCountries(countries);
    });
  };

  getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryChange = event.target.value;
    setCountry(countryChange);
  }

  return (
    <div className="app">
      <div className="app__header">
      <h1>CoronaStats</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="Global">Global</MenuItem>
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <div className="app__stats">
          <Info title="Cases" cases={4} total={12}/>

          <Info title="Recovered" cases={1} total={5}/>

          <Info title="Deaths" cases={0} total={1}/>
      </div>
      </div>
    </div>
  );
}

export default App;
