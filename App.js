import React from 'react';
import Loading from "./Loading"
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';

const API_KEY = "c28bba59104eadc1e33b16ba82884c68";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log(data);
  }

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      
      // 
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("can't find you");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {isLoading} = this.state;
    return isLoading ? <Loading /> : null;
  }
}

