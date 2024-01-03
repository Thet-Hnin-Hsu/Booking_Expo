import React, {useEffect} from "react";
import { Text, View, StyleSheet, Button, Image} from "react-native";
import {endpoints} from "../Components/endpoint"
import AsyncStorage from "@react-native-async-storage/async-storage";

function BookingDetail(props) {
    const bookings = props.route.params.bookings

    const deleteClicked = () => {
        console.log('delete click');

        fetchData = async() => {
            console.log('fetchData call');
            const token = await AsyncStorage.getItem('blog-token');
            console.log("delete",token);
            fetch(`${endpoints.endpoint}/bookingdelete/${bookings.id}/`, {
                method: 'DELETE' ,
                headers: {
                    'Content-Type': 'application/json' , 
                    'Authorization': `Token ${token}` , 
                }
            })
            .then(props.navigation.navigate('home'))
            .catch(error => Alert.alert(error))
        }
        console.log(bookings);
        fetchData();
    }


    useEffect(() => {
        props.navigation.setOptions({
            title: "Booking Detail",
            headerStyle: {
                backgroundColor: "#0AA7F0"
            },
            headerTintColor: "#fff",
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={{margin:20, alignItems:"center", justifyContent:"center"}}>
                <Text style={{fontSize:15, fontWeight:'bold', marginBottom:20}}>Name : {bookings.name}</Text>
                <Text style={{fontSize:15, fontWeight:'bold', marginBottom:20}}>Phone : {bookings.phone}</Text>
                <Text style={{fontSize:15, fontWeight:'bold', marginBottom:20}}>Person : {bookings.person}</Text>

                <View style={{width:'80%', marginTop:50}}>
                    <Button title="Update" color="#0AA7F0" onPress={() => props.navigation.navigate('booking', {"bookings":bookings, view_type: false})} />

                    <Text />
                    <Button color="red" title="Delete" onPress={deleteClicked} />

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
        marginTop: 100,
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

export default BookingDetail;