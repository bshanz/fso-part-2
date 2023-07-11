import axios from "axios"
import { useState, useEffect } from 'react';

const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

const CountryInfo = ({countries}) => {
    console.log('country info', countries)

    const [weather, setWeather] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [temperature, setTemperature] = useState(null);

    const getWeatherData = async (capital) => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`);
            console.log("weather", response.data.weather[0].main);
            setWeather(response.data.weather[0].main);
            let iconCode = response.data.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            setWeatherIcon(iconUrl);
            let tempInKelvin = response.data.main.temp;
            let tempInFahrenheit = (tempInKelvin - 273.15) * 9/5 + 32;
            setTemperature(tempInFahrenheit.toFixed());
        } catch (error) {
            console.error(`Failed to fetch weather data: ${error}`);
        }
    }

    useEffect(() => {
        if (countries.length === 1) {
            getWeatherData(countries[0].capital[0]);
        }
    }, [countries]);

    if (countries.length === 1) {
        return (
            <div>
                {countries.map(country => 
                    <div key={country.id}>
                        <li key={country.id + "-capital"}>Capital: {country.capital[0]}</li>
                        <li key={country.id + "-region"}>Region: {country.region}</li> 
                        <h3>Languages</h3>
                        <ul>
                            {Object.values(country.languages).map((language, index) => 
                                <li key={country.id + "-language-" + index}>{language}</li>
                            )}
                        </ul>
                        <h3>{country.capital[0]} weather</h3>
                        <p>{weather}</p>
                        <p>Temperature: {temperature}°F</p>
                        <img src={weatherIcon} alt="Weather icon"/>
                    </div>              
                )}
            </div>
        )
    } 
}

export default CountryInfo
