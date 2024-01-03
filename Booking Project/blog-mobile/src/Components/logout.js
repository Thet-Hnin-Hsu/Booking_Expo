import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {endpoints} from "../Components/endpoint"

function Logout(props) {
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log('useEffect call');
        fetchData = async() => {
            console.log('fetchData call');
            const token = await AsyncStorage.getItem('blog-token');
            console.log("home",token);

            fetch(`${endpoints.endpoint}/user/`, {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json' , 
                'Authorization': `Token ${token}` , 
            }
        })

        .then(resp => resp.json())
        .then(res => setUser(res))
        .catch(error => console.log(error))
        }

        console.log(user);
        fetchData();

        props.navigation.setOptions({
            title: "User Detail",
            headerStyle: {
                backgroundColor: "#0AA7F0"
            },
            headerTintColor: "#fff",
        })
    })
    
    const clickLogout = async () => {
        const token = await AsyncStorage.getItem('blog-token');

        fetch(`${endpoints.endpoint}/auth/`, {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` , 
            } ,
        })
        .then(resp => resp.json())
        .then(res => {
                props.navigation.navigate('login');
                AsyncStorage.removeItem('blog-token')
        })
        .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize:15, fontWeight:'bold', marginBottom:20}}>Username : {user.username}</Text>

            <Text style={{fontSize:15, fontWeight:'bold', marginBottom:20}}>Email : {user.email}</Text>

            <TouchableOpacity style={styles.logout} onPress={clickLogout}>
                <Text style={{color: "white"}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
        width: 100,
        height: 100,
    },

    inputText: {
        width: 200,
        height: 45,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: "#0AA7F0",
        borderWidth: 1
    },

    signup: {
        height: 20,
        marginBottom: 20,
    },

    logout: {
        width: "70%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#0AA7F0",
    },
});

export default Logout;