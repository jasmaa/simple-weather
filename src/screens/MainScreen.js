import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import RNLocation from 'react-native-location';

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

    useEffect(() => {
        RNLocation.configure({
            distanceFilter: 5.0
        });
        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse"
            }
        }).then(granted => {
            if (granted) {
                this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                    console.log(locations);
                })
            }
        });
    }, []);

    const getWeather = () => {
        RNLocation.configure({
            distanceFilter: 5.0
        });

        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'london',    // gps location unimplmented
                appid: '<app id here>',
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }} h1>{weatherData.loc}</Text>
            {renderWeatherIcon(weatherData.weather)}
            <Text style={{ textAlign: 'center', color: 'white' }} h2>{`${kelvin2farenheit(weatherData.temp)}°F / ${kelvin2celsius(weatherData.temp)}°C`}</Text>
        </SafeAreaView >
    );
}
export default MainScreen;