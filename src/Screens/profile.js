import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default class Profile extends React.Component {
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

                    <View style={{ marginLeft: 10, marginRight: 10, marginTop:Platform.OS =='android'? 20:35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                            //onPress={() =>this.props.navigation.navigate('Login')}
                            >
                                <Ionicons name="chevron-back-outline" size={40} />
                            </TouchableOpacity>
                            <View>
                            {/* fontFamily: 'Poppins', */}
                                <Text style={{  fontWeight: '600', fontSize: 18, color: '#646CE9', marginTop: 8 }}>
                                    Caralyn J.
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableWithoutFeedback>
                                <FontAwesome5 name="edit" size={20} color={'#646CE9'} />
                            </TouchableWithoutFeedback>
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
                                                    Restaurants Visited
                                                </Text>
                                                <Text style={styles.restaurantvisitedtext}>
                                                    2542
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.leaderboardview}>
                                        <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                            <View style={{ marginRight: 5, marginLeft: 5, marginTop: 5 }}>
                                                <Image source={require('../../assets/learedboard.png')} style={{ height: 15, width: 15 }} />
                                            </View>
                                            <View style={{ marginRight: 5 }}>
                                                <Text style={styles.restaurantvisitedtext}>
                                                    Leaderboard
                                                </Text>
                                                <Text style={styles.restaurantvisitedtext}>
                                                    2nd of 6
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={styles.totalcheckinview}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, alignItems: 'center' }}>
                            <Text style={styles.totalcheckintext}>
                                Total Check Ins(1300)
                            </Text>
                            <TouchableWithoutFeedback
                            onPress={() =>this.props.navigation.navigate('Checkinlist')}
                            >
                                <Text style={styles.checkinviewall}>
                                    View All
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ height: 200, width: Dimensions.get('window').width }}>
                        <MapView
                            style={{ height: 200, width: Dimensions.get('window').width }}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                        </MapView>
                    </View>
                    <View style={styles.badgesview}>
                        <View style={styles.badgetextview}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, alignItems: 'center' }}>
                                <Text style={styles.badgetext}>
                                    Badges (250)
                                </Text>
                                <TouchableWithoutFeedback
                                onPress={() =>this.props.navigation.navigate('Badges')}
                                >
                                    <Text style={styles.badgeviewall}>
                                        View All
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View >
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.badgeview} />
                                <View style={styles.badgeearnedbackgnd}>
                                    <Text style={styles.badgeearnedvalue}>
                                        x2
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.badgetitle}>
                                        Cheers To You
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.badgeview} />
                                <View style={styles.badgeearnedbackgnd}>
                                    <Text style={styles.badgeearnedvalue}>
                                        x2
                                    </Text>
                                </View>

                                <View>
                                    <Text style={styles.badgetitle}>
                                        Cheers To You
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.badgeview} />
                                <View style={styles.badgeearnedbackgnd}>
                                    <Text style={styles.badgeearnedvalue}>
                                        x2
                                    </Text>
                                </View>

                                <View>
                                    <Text style={styles.badgetitle}>
                                        Cheers To You
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.badgeview} />
                                <View style={styles.badgeearnedbackgnd}>
                                    <Text style={styles.badgeearnedvalue}>
                                        x2
                                    </Text>
                                </View>

                                <View>
                                    <Text style={styles.badgetitle}>
                                        Cheers To You
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View>
                    <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                useAngle={true}
                                angle={180}
                                colors={['#5956D7', 'rgba(166,79,207,0.6)']}
                                style={styles.photosview}
                               // style={{ height: 300, width: Dimensions.get('window').width, borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: 40 }}
                            >
                            <View style={styles.photostextview}>
                                <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft: 0, marginRight: 40,}}>
                                    <Text style={styles.totalcheckintext}>
                                        Photos (100)
                                    </Text>
                                    <TouchableWithoutFeedback>
                                    <Text style={styles.checkinviewall}>
                                        View All
                                    </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,marginLeft:20,marginRight:20 }}>
                                            <View style={styles.photoview}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.photo} />
                                            </View>
                                            <View style={styles.photoview}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.photo} />
                                            </View>
                                            <View style={styles.photoview}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.photo} />
                                            </View>
                                        </View>

                    </LinearGradient>
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
        width: Dimensions.get('window').width / 3 - 10,
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
    leaderboardview: {
        width: Dimensions.get('window').width / 4,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#EEEFFA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalcheckinview: {
        height: 40,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#5956D7',
        marginTop: 20,
        justifyContent: 'center',
        // marginLeft:1,
        // marginRight:1
    },
    totalcheckintext: {
       // fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
    },
    checkinviewall: {
       // fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: '#ffffff',
    },
    badgesview: {
        height: 120,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: -5,
        backgroundColor: '#ffffff'
    },
    badgetextview: {
        height: 40,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //backgroundColor:'#5956D7',
        marginTop: 10,
        justifyContent: 'center',
        // marginLeft:1,
        // marginRight:1
    },
    badgetext: {
       // fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: '#9973BE',
    },
    badgeviewall: {
       // fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
    },
    badgeearnedtext: {
       // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
        marginLeft: 10,
    },
    badgetitle: {
       // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 15,
        color: '#282828',
        textAlign: 'center',
    },
    badgeview: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#646CE9',
    },
    badgeimage: {
        width: 28,
        height: 28,
        borderRadius: 14,
        //borderWidth:1,
        //borderColor:'#646CE9',
    },
    badgeearnedvalue: {
       // fontFamily: 'Poppins',
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 6,
        lineHeight: 9,
        textAlign: 'center',
        color: '#ffffff',
    },
    badgeearnedbackgnd: {
        position: 'absolute',
        width: 11,
        height: 11,
        backgroundColor: '#9973BE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        left: 25,
        top: 0,
    },
    photosview: {
        height: 200,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    photostextview:{
        height:40,
        width:Dimensions.get('window').width,
        marginLeft:20,
        marginRight:20,
        justifyContent:'center',
    },
    photoview: {
        width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
    photo: {
        width: 90,
    height: 90,
    borderRadius: 10,
},



});