import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, Text, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import { Thumbnail } from 'react-native-thumbnail-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../api';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location'

const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];


export default class Discover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            margintop: 0,
            search: '',
            userid: '',
            token: '',
            userlatitude: 0,
            userlongitude: 0,
            locationstatus: '',
            currentLongitude: 0,
            currentLatitude: 0,
            listofrestaurants: [],
            showloader: false,
        }
    }





    async componentDidMount() {
        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });
        console.log('userid', this.state.userid);

        await AsyncStorage.getItem('token').then((token) => {
            if (token) {
                this.setState({ token: token });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('token', this.state.token);

        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log('location from getlocation', location);
                this.setState({ userlatitude: location.latitude, userlongitude: location.longitude })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })

        await this.getlistofrestaurants()
    }

    async componentWillMount() {
        await this.requestLocationPermission()

    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
        } else {
            try {
                //   const granted = await PermissionsAndroid.request(
                //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                //     {
                //       title: 'Location Access Required',
                //       message: 'This App needs to Access your location',
                //     },
                //   );
                //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //     //To Check, If Permission is granted
                //     this.getOneTimeLocation();
                //     this.subscribeLocationLocation();
                //   } else {
                //     this.setState({locationstatus:'Permission Denied'});
                //   }
                // } catch (err) {
                //   console.warn(err);
                // }

                const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

                if (granted) {
                    console.log("You can use the ACCESS_FINE_LOCATION")
                }
                else {
                    console.log("ACCESS_FINE_LOCATION permission denied")
                }
            }
            catch (err) {
                console.warn(err);
            }
        }
    };
    //     requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };

    getOneTimeLocation = () => {
        this.setState({ locationstatus: 'Getting Location ...' });
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                this.setState({ locationstatus: 'You are Here' });

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                this.setState({ currentLongitude: currentLongitude });

                //Setting Longitude state
                this.setState({ currentLatitude: currentLatitude });
                console.log('latitude in one time location', this.state.currentLatitude);
                console.log('latitude in one time location', this.state.currentLongitude);
            },
            (error) => {
                this.setState({ locationstatus: error.message });
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                this.setState({ locationstatus: 'You are Here' });
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                this.setState({ currentLongitude: currentLongitude });

                //Setting Latitude state
                this.setState({ currentLatitude: currentLatitude });
                console.log('latitude', this.state.currentLatitude);
                console.log('latitude', this.state.currentLongitude);
            },
            (error) => {
                this.setState({ locationstatus: error.message });
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };


    getlistofrestaurants = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        //lat= 18.1124372  long=79.01929969999999
        //fetch(BASE_URL + "restaurants?limit=4&page=1&lat="+this.state.userlatitude+"+&lon="+this.state.userlongitude+"&loc=&q=", requestOptions)
        fetch(BASE_URL + "restaurants?limit=4&page=1&lat=18.1124372&lon=9.01929969999999&loc=&q=", requestOptions)
        .then(response => response.json())
            .then(result => {
                console.log('discover', result)
                if (result.success == true) {
                    for (let i = 0; i < result.data.length; i++) {

                        this.state.listofrestaurants.push(result.data[i])
                    }

                    this.setState({ showloader: !this.state.showloader })
                }
            })
            .catch(error => console.log('error', error));
    }


    renderrestaurants = () => {
        return this.state.listofrestaurants.map((item) => {
            return (
                <View>
                <View style={styles.cardview}>
                    <View style={{ flexDirection: 'row' }}>
                        <View key={item._id} style={styles.restaurantimageview}>
                            {/* <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} /> */}
                            <Image source={{ uri: item.image }} style={styles.restaurantimage} />
                        </View>
                        <View style={{ marginRight: 5 }}>
                            <Text
                                key={item._id}
                                style={styles.restauranttitle}
                            >
                                {/* Alfred Coffee 2 Go */}
                                {item.title}
                            </Text>
                            <Text key={item._id} style={styles.restaurantlocation}>
                                {/* California, United States */}
                                {item.address.address}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/miles.png')} style={{ height: 12, width: 12, marginRight: 5, marginTop: 3 }} />
                                <Text key={item._id} style={styles.miles}>
                                    {/* 2 miles */}
                                    {item.distance} miles
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
                </View>
            )
        })
    }


    render() {
        return (

            /* <View style={{ marginTop: 15, marginLeft: 10, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                       // onPress={() => this.props.navigation.navigate('Episodes')}
                    >
                        <Ionicons name="chevron-back-outline" size={40} />
                    </TouchableWithoutFeedback> */


            <View style={styles.container}>

                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                </MapView>

                <View style={{ position: 'absolute', top: Platform.OS == 'android' ? 30 : 40, left: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <TouchableWithoutFeedback
                            // onPress={() => this.props.navigation.navigate('Episodes')}
                            >
                                <Ionicons name="chevron-back-outline" size={40} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ marginTop: 5 }}>

                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.searchFilterFunction(text)}
                                value={this.state.search}
                                //underlineColorAndroid="transparent"
                                placeholder="Search"
                            />

                            <View style={{ marginLeft: Dimensions.get('window').width / 2 + 60, marginRight: 10, marginTop: -37 }}>
                                <View style={{ width: 75, height: 38, borderRadius: 10, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableWithoutFeedback>
                                        <Image source={require('../../assets/filter.png')} style={{ height: 20, width: 20, marginRight: 10 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        {/* fontFamily: 'Poppins'  */}
                                        <Text style={{ color: '#282828', fontSize: 14, }}>
                                            Filter
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                
                    <View style={{flexDirection:'row'}}>
                        {this.state.showloader ?
                        <ScrollView
                        horizontal  
                    >
                            {this.renderrestaurants()}
                            </ScrollView>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
                                <ActivityIndicator size="large" color="#2e3191" />
                            </View>
                        }
                    </View>
               


                {/* //   customMapStyle={mapStyle}>
        //   <Marker
        //     draggable
        //     coordinate={{
        //       latitude: 37.78825,
        //       longitude: -122.4324,
        //     }}
        //     onDragEnd={
        //       (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
        //     }
        //     title={'Test Marker'}
        //     description={'This is a description of the marker'}
        //   /> */}

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // flex: 0.8
    },
    textInputStyle: {
        width:Platform.OS =='ios'? Dimensions.get('window').width / 2 + 50 : Dimensions.get('window').width/2,
        height: 38,
        marginLeft: 0,
        backgroundColor: '#EEEFFA',
        borderRadius: 10,
        paddingLeft: 20,
    },
    cardview: {
       // position: 'absolute',
        height: 120,
        width: Dimensions.get('window').width - 80,
        marginLeft: 10,
        marginTop: Dimensions.get('window').height - 210,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginRight: 10,
        //flex:0.2

    },
    restaurantimageview: {
        height: 100,
        width: 100,
        margin: 10,
        marginBottom: 0,
    },
    restaurantimage: {
        height: 95,
        width: 95,
        borderRadius: 10,
    },
    restauranttitle: {
        width: Dimensions.get('window').width / 2,
        color: '#646CE9',
        fontSize: 14,
        lineHeight: 21,
        flexWrap: 'wrap',
        //fontFamily: 'Poppins',
        marginTop: 10
    },
    restaurantlocation: {
        width: Dimensions.get('window').width / 2,
        color: '#282828',
        fontSize: 12,
        lineHeight: 15,
        flexWrap: 'wrap',
        // fontFamily: 'Poppins',
        // marginTop:5
    },
    miles: {
        fontSize: 12,
        fontWeight: '400',
        // fontFamily: 'Poppins',
        lineHeight: 18,
        color: '#596768',

    },



});

