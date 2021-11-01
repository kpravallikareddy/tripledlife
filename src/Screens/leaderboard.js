import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }




    componentDidMount() {
        //console.log('splash')

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

                    <View style={{ margin: 10, flexDirection: 'row', marginTop: Platform.OS =='android'? 20:45 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Ionicons name="chevron-back-outline" size={40} />
                        </TouchableOpacity>
                        <View>
                        {/* fontFamily: 'Poppins', */}
                            <Text style={{  fontWeight: 'bold', fontSize: 20, color: '#646CE9', marginTop: 5 }}>
                                Leaderboard
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: Dimensions.get('window').width - 60, marginLeft: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', }}>
                    {/* fontFamily: 'Poppins' */}
                        <Text style={{ fontSize: 12, lineHeight: 16, color: '#282828',  }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.
                        </Text>
                    </View>

                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                    <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View>
                                    <View style={{ position: 'absolute', left: 13, top: 7 }}>
                                        <Text style={{ color: '#ffffff', fontSize: 12 }}>
                                            1
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                    <View >
                                        <Entypo name="trophy" size={35} color={'#C9CAC9'} />
                                    </View>
                                    <View style={{ position: 'absolute', left: 13, top: 7 }}>
                                        <Text style={{ color: '#ffffff', fontSize: 12 }}>
                                            2
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Jason Nicholas
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        24
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                    <View >
                                        <Entypo name="trophy" size={35} color={'#DE8F55'} />
                                    </View>
                                    <View style={{ position: 'absolute', left: 13, top: 7 }}>
                                        <Text style={{ color: '#ffffff', fontSize: 12 }}>
                                            3
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Shirley F.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ marginLeft: 10, marginRight: 20 }}>
                                    {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                    <View>
                                    {/* fontFamily: 'Poppins', */}
                                        <Text style={{ color: '#282828', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                            4
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ marginLeft: 10, marginRight: 20 }}>
                                    {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                    <View>
                                    {/* fontFamily: 'Poppins', */}
                                        <Text style={{ color: '#282828', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                            5
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ marginLeft: 10, marginRight: 20 }}>
                                    {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                    <View>
                                    {/* fontFamily: 'Poppins', */}
                                        <Text style={{ color: '#282828', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                            6
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ marginLeft: 10, marginRight: 20 }}>
                                    {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                    <View>
                                    {/* fontFamily: 'Poppins', */}
                                        <Text style={{ color: '#282828', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                            7
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ marginLeft: 10, marginRight: 20 }}>
                                    {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                    <View>
                                    {/* fontFamily: 'Poppins', */}
                                        <Text style={{ color: '#282828', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                            8
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <LinearGradient
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            colors={['#3662DB', '#9C33CB']}
                            style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center' }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ marginLeft: 10, marginRight: 20 }}>
                                        {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                        <View>
                                        {/* fontFamily: 'Poppins', */}
                                            <Text style={{ color: '#ffffff', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                                9
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.profileview}>
                                        <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                    </View>
                                    <View>
                                        <Text style={{
                                           // fontFamily: 'Poppins',
                                            fontSize: 14,
                                            lineHeight: 21,
                                            fontWeight: '400',
                                            color: '#ffffff',
                                        }}>
                                            Caralyn J (You)
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View>
                                        <Image source={require('../../assets/pointsplain.png')} style={styles.pointsimage} />
                                    </View>
                                    <View>
                                        <Text style={{
                                           // fontFamily: 'Poppins',
                                            fontSize: 14,
                                            lineHeight: 21,
                                            fontWeight: '500',
                                            color: '#ffffff'
                                        }}>
                                            26
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={{ height: 50, width: Dimensions.get('window').width, justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ marginLeft: 5, marginRight: 20 }}>
                                    {/* <View >
                                        <Entypo name="trophy" size={35} color={'#FFCE57'} />
                                    </View> */}
                                    <View>
                                    {/* fontFamily: 'Poppins', */}
                                        <Text style={{ color: '#282828', fontSize: 14,  fontWeight: '400', lineHeight: 21, }}>
                                            10
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.profileview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                </View>
                                <View>
                                    <Text style={styles.profilename}>
                                        Sonia K.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image source={require('../../assets/points.png')} style={styles.pointsimage} />
                                </View>
                                <View>
                                    <Text style={styles.pointstext}>
                                        26
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileview: {
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    profileimage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    profilename: {
       // fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        color: '#282828',
        // textAlign:'center'
    },
    pointstext: {
       // fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '500',
        color: '#9973BE'
    },
    pointsimage: {
        width: 12,
        height: 14,
        //marginTop:5,
        marginRight: 3,

    }







});