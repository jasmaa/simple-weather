import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const axios = require('axios');

const MainScreen = () => {

    const [weatherData, setWeatherData] = useState({
        loc: '',
        weather: '',
        temp: 0,
    });

    const kelvin2celsius = (temp) => {
        return Math.floor(temp - 273.15);
    }
    const kelvin2farenheit = (temp) => {
        return Math.floor((temp - 273.15) * 9 / 5 + 32);
    }

    const getWeather = () => {
        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'London',
                appid: '<insert app key here>',
            },
        })
            .then((response) => {
                setWeatherData({
                    loc: response.data.name,
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                });
                console.log(response.data);
            });
    }
    getWeather();

    const renderWeatherIcon = (weather) => {
        switch (weather) {
            case "Sunny":
                return (<Icon size={80} name='wb-sunny' />);
            case "Clear":
                return (<Icon size={80} name='wb-sunny' />);
            case "Mist":
                return (<Icon size={80} type='material' name='dehaze' />);
            case "Haze":
                return (<Icon size={80} type='material' name='dehaze' />);
            case "Fog":
                return (<Icon size={80} type='material-community' name='weather-fog' />);
            case "Clouds":
                return (<Icon size={80} name='wb-cloudy' />);
            case "Rain":
                return (<Icon size={80} type='feather' name='cloud-rain' />);
            case "Thunderstorm":
                return (<Icon size={80} type='material-community' name='weather-lightning' />);
            case "Snow":
                return (<Icon size={80} type='material-community' name='weather-snowy' />);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text h1>{weatherData.loc}</Text>
            <View style={{ margin: 50 }}>
                {renderWeatherIcon(weatherData.weather)}
                <Text h4>{weatherData.weather}</Text>
            </View>
            <Text h2>{`${kelvin2farenheit(weatherData.temp)}°F / ${kelvin2celsius(weatherData.temp)}°C`}</Text>
        </SafeAreaView>
    );
}
export default MainScreen;