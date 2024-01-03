import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {endpoints} from "../Components/endpoint"

function BookingList(props) {
    const [bookings, setBookings] = useState({})

    const bookClick = bookings => {
        props.navigation.navigate('bookingdetail', {"bookings":bookings});
    }

    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefresh = () => {
        setIsRefreshing(true)
        setTimeout(()=>{
            setIsRefreshing(false)
        },200)
    }

    useEffect(() => {
        console.log('useEffect call');
        fetchData = async() => {
            console.log('fetchData call');
            const token = await AsyncStorage.getItem('blog-token');
            console.log("home",token);

            fetch(`${endpoints.endpoint}/api/bookings/`, {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json' , 
                'Authorization': `Token ${token}` , 
            }
        })

        .then(resp => resp.json())
        .then(res => setBookings(res))
        .catch(error => console.log(error))
        }

        console.log(bookings);
        fetchData();
        

        props.navigation.setOptions({
            title: "Booking List",
                    headerStyle: {
                        backgroundColor: '#0AA7F0'
                    },
                    headerTintColor: '#fff',
        })
    }, [isRefreshing])

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={({item, index}) => (
                    <Text style={{marginLeft:20, marginRight:20, marginBottom:20, backgroundColor:'#0AA7F0'}} onPress={() => bookClick(item)}>
                        <View style={{marginBottom:20, paddingLeft:20, paddingRight:20}}>
                            <Text style={{fontSize:15, fontWeight:'bold', paddingTop:20, color:'#ffffff'}}>
                                Name : {item.name}
                            </Text>

                            <Text style={{fontSize:15, fontWeight:'bold', paddingTop:15, color:'#ffffff'}}>
                                Phone : {item.phone}
                            </Text>

                            <Text style={{fontSize:15, fontWeight:'bold', paddingBottom:20, paddingTop:15, color:'#ffffff'}}>
                                Person : {item.person}
                            </Text>
                        </View>
                    </Text>
                )} onRefresh={onRefresh}
                refreshing={isRefreshing}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
});

export default BookingList;