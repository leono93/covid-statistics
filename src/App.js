import React, { useState, useEffect } from 'react';
import './App.css';
import{ MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import Info from './Info';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['Global']);
  const [countryInfo, setCountryInfo] = useState({});

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

  const onCountryChange = async (e) => {
    const countryChange = e.target.value;
    setCountry(countryChange);

    const url = countryChange === 'Global' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryChange}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryChange);
      setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>CoronaStatistics</h1>
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
      </div>
      <div className="app__stats">
          <Info title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <Info title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <Info title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      <Map/>
      </div>
      </div>
      <Card className="app__right">
          <CardContent>
            <h3>Cases by Country</h3>
            <h3>New cases</h3>
          </CardContent>
      </Card>
      </div>
  );
}

export default App;
