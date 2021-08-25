import React from 'react';
import PropTypes from "prop-types"; // 유효성 검사
import {View, Text, StyleSheet, StatusBar} from "react-native"; 
import {MaterialCommunityIcons} from '@expo/vector-icons'; //icon
import {LinearGradient} from 'expo-linear-gradient'; //background Gradient

//weather data 정의
const weatherOptions = {
    Thunderstorm: {
        iconName: "weather-lightning",
        gradient: [
            "#373B44", "#4286f4"
        ],
        title: "Thunderstorm in the house",
        subtitle: "Actually, outside of the house"
    },
    Drizzle: {
        iconName: "weather-partly-rainy",
        gradient: [
            "#89F7FE", "#66A6FF"
        ],
        title: "Drizzle",
        subtitle: "Is like rain, but gay 🏳️‍🌈"
    },
    Rain: {
        iconName: "weather-rainy",
        gradient: [
            "#00C6FB", "#005BEA"
        ],
        title: "Raining like a MF",
        subtitle: "For more info look outside"
    },
    Snow: {
        iconName: "weather-snowy",
        gradient: [
            "#7DE2FC", "#B9B6E5"
        ],
        title: "Cold as balls",
        subtitle: "Do you want to build a snowman? Fuck no."
    },
    Atmosphere: {
        iconName: "weather-sunset",
        gradient: [
            "#89F7FE", "#66A6FF"
        ],
        title: "Atmosphere",
        subtitle: "a little wind blows"
    },
    Clear: {
        iconName: "weather-sunny",
        gradient: [
            "#FF7300", "#FEF253"
        ],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt"
    },
    Clouds: {
        iconName: "weather-cloudy",
        gradient: [
            "#D7D2CC", "#304352"
        ],
        title: "Clouds",
        subtitle: "I know, fucking boring"
    },
    Mist: {
        iconName: "weather-hail",
        gradient: [
            "#4DA0B0", "#D39D38"
        ],
        title: "Mist!",
        subtitle: "It's like you have no glasses on."
    },
    Dust: {
        iconName: "weather-fog",
        gradient: [
            "#4DA0B0", "#D39D38"
        ],
        title: "Dusty",
        subtitle: "Thanks a lot China 🖕🏻"
    },
    Haze: {
        iconName: "weather-hazy",
        gradient: [
            "#4DA0B0", "#D39D38"
        ],
        title: "Haze",
        subtitle: "Just don't go outside."
    }
};

// Weather Activity
export default function Weather({temp, condition}) {
    return (
        <LinearGradient
            style={styles.container}
            colors={weatherOptions[condition].gradient}>

            {/* 상태바 스타일 설정 */}
            <StatusBar barStyle="light-content"/>

            <View style={styles.halfContainer}>
                <MaterialCommunityIcons
                    name={weatherOptions[condition].iconName}
                    size={96}
                    color="white"/>
                <Text style={styles.temp}>{temp}°</Text>
            </View>

            {/* 두가지 스타일 적용 */}
            <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
                <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
            </View>
        </LinearGradient>
    );
}

// 받아온 temp와 condition의 값이 유효한 값이지 판단하기 위해 타입을 미리 정의함
Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes
        .oneOf([
            "Thunderstorm",
            "Drizzle",
            "Rain",
            "Snow",
            "Atmosphere",
            "Clear",
            "Clouds",
            "Haze",
            "Mist",
            "Dust"
        ])
        .isRequired
}

//css
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    temp: {
        fontSize: 42,
        color: "white"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 40,
        fontWeight: "300",
        marginBottom: 10,
        textAlign: "left"
    },
    subtitle: {
        fontWeight: "600",
        color: "white",
        fontSize: 24,
        textAlign: "left"
    },
    textContainer: {
        alignItems: "flex-start",
        paddingHorizontal: 30,
        justifyContent: "center",
        flex: 1
    }
});