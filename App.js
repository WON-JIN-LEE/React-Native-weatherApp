import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from "./Loading"
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);

      // 
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

