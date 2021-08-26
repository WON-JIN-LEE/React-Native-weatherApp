import React from 'react';
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from 'expo-location'; //location API
import {Alert} from 'react-native';
import axios from 'axios'; // http 통신 라이브러리


const WEATHER_API_KEY = "c28bba59104eadc1e33b16ba82884c68";

export default class extends React.Component {
    state = {
        isLoading: true
    };

    // openweathermap API
    getWeather = async (latitude, longitude) => {
        const { data: {
                main: {temp},
                weather,
                name:city,
            }
        } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
        
        // 받아온 날씨와 온도를 저장합니다.
        this.setState({isLoading: false, condition: weather[0].main, temp, city});

    };

    //Location API : 지역의 위도와 경도 데이터를 가져옵니다.
    getLocation = async () => {
        try {
            //앱이 위치 액세스에 대한 권한 요청
            await Location.requestBackgroundPermissionsAsync();
            
            //사용자의 현재 위치데이터를 요청 
            //Location.getCurrentPositionAsync()를 사용하지 않은 이유는 데이터를 가져오는 도중에 에러가 발생함
            //3번의 실행 중 1번은 성공적으로 가져옴,어떤이유로 에러가 발생하지 잘 모르겠습니다. 
            const { coords: {
                latitude,
                longitude
            } } = await Location.getLastKnownPositionAsync();
            
            //Weather 호출
            this.getWeather(latitude, longitude);
            
        } catch (error) {
            Alert.alert("can't find you");
        }
    };

    componentDidMount() {
        //Location 호출
        this.getLocation();
    }

    render() {
        const {isLoading, temp, condition, city} = this.state;
        return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} city={city} />;
    }
}
