import React from 'react';
import Loading from "./Loading"
import Weather from "./Weather"
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';

const API_KEY = "c28bba59104eadc1e33b16ba82884c68";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      } 
}
      = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    

    this.setState({
        isLoading: false,
        condition: weather[0].main,
        temp,
    });

};

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      
      // 
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("can't find you");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {isLoading, temp, condition} = this.state;
    return isLoading ? (<Loading />) : (<Weather temp={Math.round(temp)} condition={condition} />);
  }
}
