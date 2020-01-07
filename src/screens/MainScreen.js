import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, PermissionsAndroid } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const axios = require('axios');

const kelvin2celsius = (temp) => {
    return Math.floor(temp - 273.15);
}
const kelvin2farenheit = (temp) => {
    return Math.floor((temp - 273.15) * 9 / 5 + 32);
}

async function requestGeolocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Access Location',
                message: 'Allow Simple Weather to access your location?',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Geolocation on');
        } else {
            console.log('Access denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

const MainScreen = () => {

    const [weatherData, setWeatherData] = useState({
        loc: '',
        weather: '',
        temp: 0,
    });

    useEffect(() => {

        console.log(navigator.appVersion);

        /*
        navigator.geolocation.getCurrentPosition(
            (position) => console.log(position),
            (error) => console.error(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        */
    }, []);

    const getWeather = () => {
        // http://api.openweathermap.org/data/2.5/weather
        axios.get('https://samples.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'london',    // gps location unimplmented
                appid: '<appid here>',
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
        let type = 'material';
        let name = 'wb-sunny';

        switch (weather) {
            case "Sunny":
                color = 'yellow';
                name = 'wb-sunny';
                break;
            case "Clear":
                color = 'yellow';
                name = 'wb-sunny';
                break;
            case "Mist":
                color = 'white';
                name = 'dehaze';
                break;
            case "Haze":
                color = 'white';
                name = 'dehaze';
                break;
            case "Fog":
                color = 'white';
                type = 'material-community';
                name = 'weather-fog';
                break;
            case "Clouds":
                color = 'gray';
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
            onLayout={getWeather}
        >
            <Text style={{ color: 'white' }} h1>{weatherData.loc}</Text>
            {renderWeatherIcon(weatherData.weather)}
            <Text style={{ textAlign: 'center', color: 'white' }} h2>
                {`${kelvin2farenheit(weatherData.temp)}°F / ${kelvin2celsius(weatherData.temp)}°C`}
            </Text>
            <Button title="hi there" onPress={requestGeolocationPermission} />
        </SafeAreaView>
    );
}
export default MainScreen;