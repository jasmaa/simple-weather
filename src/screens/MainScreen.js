import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

const axios = require('axios');

const kelvin2celsius = (temp) => {
    return Math.floor(temp - 273.15);
}
const kelvin2farenheit = (temp) => {
    return Math.floor((temp - 273.15) * 9 / 5 + 32);
}

const MainScreen = () => {

    const [weatherData, setWeatherData] = useState({
        loc: '',
        weather: '',
        temp: 0,
    });

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                getWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                setWeatherData({
                    loc: 'No Location',
                    weather: '',
                    temp: 0,
                });
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const getWeather = (lat, lon) => {

        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,
                lon: lon,
                appid: require('../credentials.json').appid,
            },
        })
            .then((response) => {
                setWeatherData({
                    loc: response.data.name,
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                });
            });
    }

    const renderWeatherIcon = (weather) => {

        let color = 'white';
        let type = 'material-community';
        let name = 'earth';

        switch (weather) {
            case "Sunny":
                color = 'yellow';
                type = 'material';
                name = 'wb-sunny';
                break;
            case "Clear":
                color = 'yellow';
                type = 'material';
                name = 'wb-sunny';
                break;
            case "Mist":
                color = 'white';
                type = 'material';
                name = 'dehaze';
                break;
            case "Haze":
                color = 'white';
                type = 'material';
                name = 'dehaze';
                break;
            case "Fog":
                color = 'white';
                type = 'material-community';
                name = 'weather-fog';
                break;
            case "Clouds":
                color = 'gray';
                type = 'material';
                name = 'wb-cloudy';
                break;
            case "Drizzle":
                color = 'gray';
                type = 'feather';
                name = 'cloud-rain';
                break;
            case "Rain":
                color = 'gray';
                type = 'feather';
                name = 'cloud-rain';
                break;
            case "Thunderstorm":
                color = 'yellow';
                type = 'material-community';
                name = 'weather-lightning';
                break;
            case "Snow":
                color = 'gray';
                type = 'material-community';
                name = 'weather-snowy';
                break;
        }

        return (
            <View style={{ margin: 50 }}>
                <Icon size={80} color={color} type={type} name={name} />
                <Text style={{ textAlign: 'center', color: color }} h4>{weatherData.weather}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
        >
            <Text style={{ color: 'white' }} h1>{weatherData.loc}</Text>
            {renderWeatherIcon(weatherData.weather)}
            <Text style={{ textAlign: 'center', color: 'white' }} h2>
                {`${kelvin2farenheit(weatherData.temp)}°F / ${kelvin2celsius(weatherData.temp)}°C`}
            </Text>
        </SafeAreaView>
    );
}
export default MainScreen;