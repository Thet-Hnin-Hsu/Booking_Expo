import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, TextInput, Button, Image} from "react-native";
import {endpoints} from "../Components/endpoint"
import AsyncStorage from "@react-native-async-storage/async-storage";

function Booking(props) {
    const [bookings, setBookings] = useState({})
    const [view, setView] = useState(true)
    const travels = props.route.params.travels

    const inputChanged = (name, value) => {
        console.log('input change', name, value);
        newPost = {...bookings}
        newPost[name] = value
        setBookings(newPost)
    }

    const save = () => {
        console.log('save click');

        fetchData = async() => {
            console.log('fetchData call');
            const token = await AsyncStorage.getItem('blog-token');
            console.log("save",token);
            fetch(`${endpoints.endpoint}/api/bookings/`, {
                method: 'POST' ,
                headers: {
                    'Content-Type': 'application/json' , 
                    'Authorization': `Token ${token}` , 
                },
                body: JSON.stringify(bookings)
            })
            .then(resp => resp.json())
            .then(props.navigation.navigate('bookingdetail',{"bookings":bookings}))
            .catch(error => console.log(error))
        }
        console.log(bookings);
        fetchData();
    }

    const update = () => {
        console.log('update click');

        fetchData = async() => {
            console.log('fetchData call');
            const token = await AsyncStorage.getItem('blog-token');
            console.log("update",token);
            fetch(`${endpoints.endpoint}/api/bookings/${bookings.id}/`, {
                method: 'PUT' ,
                headers: {
                    'Content-Type': 'application/json' , 
                    'Authorization': `Token ${token}` , 
                },
                body: JSON.stringify(bookings)
            })
            .then(resp => resp.json())
            .then(props.navigation.navigate('bookingdetail',{"bookings":bookings}))
            .catch(error => console.log(error))
        }
        console.log(bookings);
        fetchData();
    }


    useEffect(() => {
        if(props.route.params.bookings !== undefined) {
            console.log("useeffect=>",bookings);
            setBookings(props.route.params.bookings)
            setView(props.route.params.view_type)
        }

        props.navigation.setOptions({
            title: "Booking",
            headerStyle: {
                backgroundColor: "#0AA7F0"
            },
            headerTintColor: "#fff",
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={{marginBottom:20, marginRight:20, marginLeft:20, alignItems:"flex-start", justifyContent:"center"}}>
                {
                    view ? <Image style={{width:350, height:230, marginTop:30, marginBottom:20}} source={{uri:travels.image}} /> : 
                    <Text />
                }

                {
                    view ? <Text style={{fontSize:15, fontWeight:"bold", marginBottom:20}}>Place : {travels.place}</Text> :
                    <Text />
                }
                
                {
                    view ? <Text style={{fontSize:15, fontWeight:'bold', marginBottom:20}}>Price : {travels.price} $</Text> :
                    <Text />
                }
                
                <View style={{flexDirection:'row', alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:15, fontWeight:"bold", marginBottom:20}}>Name : </Text>
                    <TextInput style={styles.inputText} onChangeText={(value) => inputChanged('name', value)} value={bookings.name} />
                </View>

                <View style={{flexDirection:'row', alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:15, fontWeight:"bold", marginBottom:20}}>Phone : </Text>
                    <TextInput style={styles.inputText} onChangeText={(value) => inputChanged('phone', value)} value={bookings.phone} />
                </View>

                <View style={{flexDirection:'row', alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:15, fontWeight:"bold", marginBottom:20}}>Person : </Text>
                    <TextInput style={styles.inputText} onChangeText={(value) => inputChanged('person', value)} value={bookings.person} />
                </View>

                <View style={{width: '80%', marginTop:30}}>
                    {
                        view ? <Button onPress={save} title="Book" /> : 
                        <Button onPress={update} title="Update" />
                    }
                    <Text />
                    <Button color="gray" title="Go Home" onPress={() => props.navigation.navigate('home')} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    inputText: {
        width: 200,
        padding: 10,
        height: 45,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#0AA7F0',
        borderWidth: 1,
    },
});

export default Booking;