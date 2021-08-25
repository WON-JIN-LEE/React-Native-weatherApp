import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// 로딩 Activity 
export default function Loading() {
    return (
            <LinearGradient style={styles.container} colors={["#605C3C","#3C3B3F"]}>
            <Text style={styles.text}>Getting the real-time Weather</Text>
            </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 40,
        paddingVertical: 140,
    },
    text: {
        color: "#fff",
        fontSize: 30,
    }
});