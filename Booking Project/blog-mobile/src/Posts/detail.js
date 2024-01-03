import React, {useEffect} from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";

function Detail(props) {
    const travels = props.route.params.travels

    useEffect(() => {
        props.navigation.setOptions({
            title: "Detail",
            headerStyle: {
                backgroundColor: "#0AA7F0"
            },
            headerTintColor: "#fff",
        })
    })

    return (
        <View style={styles.container}>

            <View style={{marginLeft:20, marginRight:20, alignItems:"flex-start"}}>
                <Image style={{width:350, height:230, marginTop:30}} source={{uri:travels.image}} />
                <Text style={{fontSize:18, fontWeight:'bold', paddingTop:20, color:'#000000'}}>Place : {travels.place}</Text>
                <Text style={{fontSize:13, paddingTop:20, width:300, color:'gray'}}>About : {travels.about}</Text>
                <Text style={{fontSize:20, fontWeight:'bold', paddingTop:20, color:'#000000'}}>Price : {travels.price} $</Text>
            </View>

            <View style={{marginTop:30, alignItems:"center"}}>
                <View style={{width:'80%'}}>
                    <Button title="Book" color="#0AA7F0" onPress={() => props.navigation.navigate('booking', {"travels":travels, view_type: false})} />
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
});

export default Detail;