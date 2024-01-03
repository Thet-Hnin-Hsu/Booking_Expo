import React, {useEffect, useState} from "react";
import { Text, Image, View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {endpoints} from "../Components/endpoint"

function Home(props) {
    const [travels, setTravels] = useState({})

    const postClick = travels => {
        props.navigation.navigate('detail', {"travels":travels});
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

            fetch(`${endpoints.endpoint}/api/travels/`, {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json' , 
                'Authorization': `Token ${token}` , 
            }
        })

        .then(resp => resp.json())
        .then(res => setTravels(res))
        .catch(error => console.log(error))
        }

        console.log(travels);
        fetchData();
        

        props.navigation.setOptions({
            title: "Home",
                    headerStyle: {
                        backgroundColor: '#0AA7F0'
                    },
                    headerTintColor: '#fff',
        })
    }, [isRefreshing])

    return (
        <View style={styles.container}>
            <FlatList
                data={travels}
                renderItem={({item, index}) => (
                    <Text style={{margin:20, backgroundColor:'#0AA7F0'}} onPress={() => postClick(item)}>
                        <View style={{paddingLeft:20, paddingRight:20}}>
                            <Image style={{width:300, height:200, marginTop:40}} source={{uri:item.image}} />

                            <Text style={{fontSize:20, fontWeight:'bold', paddingTop:20, color:'#ffff00'}}>
                                {item.place}
                            </Text>

                            <Text numberOfLines={3} ellipsizeMode="tail" style={{fontSize:10, paddingTop:20, width:300, color:'#dddddd'}}>
                                {item.about}
                            </Text>

                            <Text style={{fontSize:20, fontWeight:'bold', paddingBottom:40, paddingTop:20, color:'#ffffff'}}>
                                Price : {item.price} $
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
    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
});

export default Home;