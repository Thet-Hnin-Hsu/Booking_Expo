import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {endpoints} from "../Components/endpoint"

function Login(props) {
    const [user, setUser] = useState({})

    const inputChanged = (name, value) => {
        let newUser = user;
        newUser[name] = value;
        setUser(newUser)
    }

    const clickLogin = () => {
        console.log('clickLogin call');

        fetch(`${endpoints.endpoint}/auth/`, {
            method: 'POST' ,
            headers: {'Content-Type': 'application/json'} ,
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(res => {
            console.log(res.token);
            if (res.token) {
                props.navigation.navigate('home');
                AsyncStorage.setItem('blog-token',res.token)
            } else {
                Alert.alert("Username & Password Invalid!");
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/icon.png")} />

            <TextInput style={styles.inputText} placeholder="Username" onChangeText={value => inputChanged('username',value)} />

            <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true} onChangeText={value => inputChanged('password',value)} />

            <Text style={styles.signup}>Create New Account?</Text>

            <TouchableOpacity style={styles.login} onPress={clickLogin}>
                <Text style={{color: "white"}}>Login</Text>
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

    login: {
        width: "70%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#0AA7F0",
    },
});

export default Login;