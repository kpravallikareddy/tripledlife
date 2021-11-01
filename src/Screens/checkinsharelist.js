import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default class Checkinsharelist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }




    componentDidMount() {


    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    //alignItems: 'center',

                }}
            >
                <ScrollView>

                    <View style={{ marginLeft: 10, marginRight: 10, marginTop: Platform.OS =='android'? 20:45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                            //onPress={() =>this.props.navigation.navigate('Login')}
                            >
                                <Ionicons name="chevron-back-outline" size={40} />
                            </TouchableOpacity>
                            <View>
                            {/* fontFamily: 'Poppins', */}
                                <Text style={{  fontWeight: '600', fontSize: 18, color: '#646CE9', marginTop: 8 }}>
                                    Share
                                </Text>
                            </View>
                        </View>
                        <View>
                            {/* <TouchableWithoutFeedback>
                                <FontAwesome5 name="edit" size={20} color={'#646CE9'} />
                            </TouchableWithoutFeedback> */}
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10, }}>

                            <View style={styles.profileimageview}>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                            </View>

                            <View>
                                <Text style={styles.location}>
                                    Austin, Texas
                                </Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.restaurantsvisitedview}>
                                        <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                            <View style={{ marginRight: 5, marginLeft: 5 }}>
                                                <MaterialIcons name="location-pin" size={22} color={'#646CE9'} />
                                            </View>
                                            <View style={{ marginRight: 5 }}>
                                                <Text style={styles.restaurantvisitedtext}>
                                                    Total Location Visited
                                                </Text>
                                                <Text style={styles.restaurantvisitedtext}>
                                                    2542
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={{ height: Dimensions.get('window').height-220, width: Dimensions.get('window').width,marginTop:20 }}>
                        <MapView
                            style={{ height: Dimensions.get('window').height-220, width: Dimensions.get('window').width }}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                        </MapView>
                    </View>

                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',top:Dimensions.get('window').height-130, left:Dimensions.get('window').width/3}}>
                <TouchableOpacity
                onPress={() =>this.props.navigation.navigate('Checkinlist')}
                //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                >
                    <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                        colors={['#3662DB','#9C33CB']}
                        style={{ height: 40, width: Dimensions.get('window').width/3, borderRadius: 8,alignItems:'center',justifyContent:'center'  }} 
                    >
                            <Text
                            // fontFamily:'Poppins',
                            style={{color:'#ffffff', fontWeight:'500',fontSize:22}}
                            >
                                Done
                            </Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>

                </View>
                

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    profileimageview: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 5,

    },
    profileimage: {
        height: 56,
        width: 56,
        borderRadius: 28,
    },
    location: {
       // fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828'
    },
    restaurantsvisitedview: {
        width: Dimensions.get('window').width / 3 ,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#EEEFFA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,

    },
    restaurantvisitedtext: {
       // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 12,
        color: '#596768',

    },
   
  

});