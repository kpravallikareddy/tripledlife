import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TextInput, Modal, Text, Platform, Dimensions, ImageBackground, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import { Thumbnail } from 'react-native-thumbnail-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-shadow-cards';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../api';


export default class Badges extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            margintop: 0,
            showadditonallocations: false,
            slugvalue: this.props.route.params.slugvalue,
            restaurantdetails: '',
            episodedata:[],
            showloader:false,
        }
    }





    async componentDidMount() {
        await this.getrestaurantdetail()
    }

    getrestaurantdetail = () => {

        console.log('slugvalue', this.state.slugvalue)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "restaurants/" + this.state.slugvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                if (result.success == true) {
                    this.setState({ restaurantdetails: result.data })
                    for (let i = 0; i < result.data.episodes.length; i++) {
            
                        this.state.episodedata.push(result.data.episodes[i])
                      }
                    
                      this.setState({showloader:!this.state.showloader})
                }
                else {
                    alert(result.message)
                }
                console.log('episodedata',this.state.episodedata[0].episodes.title)
                //console.log('address', this.state.restaurantdetails.address.address)
            })
            .catch(error => console.log('error', error));
    }

    renderepisodedata = () => {
        return this.state.episodedata.map((item) => {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.episodeimageview}>
                        <Image source={require('../../assets/restaurant.jpeg')} style={styles.episodeimage} />
                        {/* <Image source={{uri:item.image}} style={styles.episodeimage} /> */}
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text
                            style={styles.episodetitle}
                        >
                            {/* Totally fried */}
                            {item.episodes.title}
                        </Text>
                        <Text style={styles.episodeseason}>
                            {/* Season1 | Episode1 | January 18, 2020 */}
                            {item.episodes.post_code} | {item.episodes.publish_date}
                        </Text>
                    </View>
                </View>
            )
        })
    }



    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}
            >
                <ScrollView>
                    <View>
                        <ImageBackground
                            source={require('../../assets/restaurant.jpeg')}
                            style={{ height: 200, width: Dimensions.get('window').width }}
                        >
                            <View style={{ marginTop: Platform.OS == 'android' ? 15 : 35, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.goBack(null)}
                                >
                                    <Ionicons name="chevron-back-outline" size={40} color={'#ffffff'} />
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    style={styles.checkinview}
                                    onPress={() => alert('checkin')}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialIcons name="location-pin" size={20} color={'#646CE9'} />
                                        <Text style={styles.checkintext}>
                                            Check In
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.restaurantdescription}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -50, }}>
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                useAngle={true}
                                angle={180}
                                colors={['rgba(231,232,253,0.47)', '#E3F3FA']}
                                style={{ height: 180, width: Dimensions.get('window').width - 50, borderRadius: 10, }}
                            >
                                <View style={{ marginLeft: 20, marginTop: 10 }}>
                                    <View>
                                        <Text style={styles.restaurantname}>
                                            {/* Alfred Coffee 2 Go */}
                                            {this.state.restaurantdetails.title}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                        <MaterialIcons name="location-pin" size={15} color={'#596768'} style={{ marginRight: 5, marginLeft: 0 }} />
                                        <Text style={styles.locationtext}>
                                            {/* 8509 Melrose Ave, West Hollywood, CA 90069 */}
                                            {/* {this.state.restaurantdetails.address.address} */}
                                            {/* {this.state.restaurantdetails.address.address} */}
                                        </Text>
                                    </View>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.setState({ showadditonallocations: !this.state.showadditonallocations })}
                                    >
                                        <Text style={styles.additionaltext}>
                                            View Additional Locations
                                        </Text>
                                    </TouchableWithoutFeedback>
                                    <View>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={this.state.showadditonallocations}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',

                                                }}
                                            >
                                                <View
                                                    elevation={15}
                                                    style={{
                                                        width: '100%',
                                                        height: Dimensions.get('window').height / 3,
                                                        backgroundColor: '#FFFFFF',
                                                        borderRadius: 20,

                                                    }}
                                                >
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                                        <TouchableWithoutFeedback
                                                            style={{ width: 50, height: 6, backgroundColor: '#C4C4C4' }}
                                                        >

                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                                                        <View>
                                                            <Text style={styles.additionallocations}>
                                                                Additional Locations
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 10 }}>
                                                            <Text style={styles.restaurantname}>
                                                                Alfred Coffee 2 Go
                                                            </Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                                            <MaterialIcons name="location-pin" size={15} color={'#596768'} style={{ marginRight: 5, marginLeft: 0, marginTop: -5 }} />
                                                            <Text style={styles.locationtext}>
                                                                8509 Melrose Ave, West Hollywood, CA 90069
                                                            </Text>
                                                        </View>


                                                    </View>
                                                </View>
                                            </View>

                                        </Modal>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                        <MaterialIcons name="phone" size={15} color={'#596768'} style={{ marginRight: 5 }} />
                                        <Text style={styles.phonenumber}>
                                            {/* +1 424-288-4126 */}
                                            +1 {this.state.restaurantdetails.phone_number}
                                        </Text>
                                    </View>
                                    <View style={{}}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <TouchableWithoutFeedback
                                                // onPress={() =>}
                                                onPress={() => { Linking.openURL(this.state.restaurantdetails.social.facebook) }}
                                            >
                                                <Image source={require('../../assets/facebook.png')} style={styles.imagesocialicons} />
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={() => { Linking.openURL(this.state.restaurantdetails.social.instagram) }}
                                            >
                                                <Image source={require('../../assets/insta.png')} style={styles.imagesocialicons} />
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={() => { Linking.openURL(this.state.restaurantdetails.social.twitter) }}
                                            >
                                                <Image source={require('../../assets/Twitter.png')} style={styles.imagesocialicons} />
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={() => { Linking.openURL(this.state.restaurantdetails.social.website) }}
                                            >
                                                <Image source={require('../../assets/globe.png')} style={styles.imagesocialicons} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 0, alignItems: 'center', marginTop: 10 }}>
                                        <TouchableOpacity>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Entypo name="thumbs-up" size={20} color={'#646CE9'} style={{ marginRight: 5 }} />
                                                <Text style={styles.liketext}>
                                                    {/* Like(10) */}
                                                    Like({this.state.restaurantdetails.likes})
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={{ flexDirection: 'row' }}>
                                                <FontAwesome name="commenting" size={20} color={'#838383'} style={{ marginRight: 5 }} />
                                                <Text style={styles.liketext}>
                                                    {/* Comment(10) */}
                                                    Comment({this.state.restaurantdetails.comments})
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name="share-outline" size={20} color={'#838383'} style={{ marginRight: 5 }} />
                                                <Text style={styles.liketext}>
                                                    Share
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>



                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: Dimensions.get('window').width - 50, paddingBottom: 5 }}>
                            <Text style={styles.restaurantdescriptiontext}>
                                {/* Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, */}
                                {this.state.restaurantdetails.description}
                            </Text>
                            {/* <TouchableWithoutFeedback>
                                    <Text style={styles.moretext}>
                                        more...
                                    </Text>
                                </TouchableWithoutFeedback> */}
                        </View>
                    </View>

                    <View>
                        <TouchableWithoutFeedback
                        //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                useAngle={true}
                                angle={180}
                                colors={['#5956D7', 'rgba(166,79,207,0.6)']}
                                style={{ height: 180, width: Dimensions.get('window').width, borderRadius: 10, }}
                            >
                                <View style={{ marginLeft: 10 }}>
                                    <View>
                                        <Text style={styles.appereadontext}>
                                            Appeared On
                                        </Text>
                                    </View>
                                    <View >
                                        {this.state.showloader?
                                        this.renderepisodedata()
                                        :
                                        <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
                                        <ActivityIndicator size="large" color="#ffffff" />
                                    </View>
                                        }
                                        {/* <View style={styles.episodeimageview}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.episodeimage} />
                                            </View>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text
                                                    style={styles.episodetitle}
                                                >
                                                    Totally fried
                                                    
                                                </Text>
                                                <Text style={styles.episodeseason}>
                                                    Season1 | Episode1 | January 18, 2020
                                                </Text>
                                            </View> */}
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.featureddishes}>
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <Text style={styles.featureddishestext}>
                                Featured Dishes
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.dishview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.dishimage} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text
                                        style={styles.dishheading}
                                    >
                                        Avocado Toast
                                    </Text>
                                    <Text style={styles.clicktoview}>
                                        Click to view
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.dishview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.dishimage} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text
                                        style={styles.dishheading}
                                    >
                                        Strawberry Parfaits
                                    </Text>
                                    <Text style={styles.clicktoview}>
                                        Click to view
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.dishview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.dishimage} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text
                                        style={styles.dishheading}
                                    >
                                        Blue Cocktail
                                    </Text>
                                    <Text style={styles.clicktoview}>
                                        Click to view
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.dishview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.dishimage} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text
                                        style={styles.dishheading}
                                    >
                                        Veggies Cheese Wrap
                                    </Text>
                                    <Text style={styles.clicktoview}>
                                        Click to view
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View>
                        <View>
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                useAngle={true}
                                angle={180}
                                colors={['#5956D7', 'rgba(166,79,207,0.6)']}
                                style={{ height: 200, width: Dimensions.get('window').width, borderRadius: 10, }}
                            >
                                <View style={{ margin: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <Text style={styles.photostext}>
                                            Photos(100)
                                        </Text>
                                        <TouchableWithoutFeedback>
                                            <Text style={styles.viewall}>
                                                View All
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
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

                                </View>
                            </LinearGradient>
                        </View>
                    </View>


                    <View style={styles.checkinsview}>
                        <View style={{ margin: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={styles.checkinstext}>
                                    Check Ins(1300)
                                </Text>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.navigate('Checkinlist',{slugvalue:this.state.slugvalue})}
                                >
                                    <Text style={styles.checkinsviewall}>
                                        View All
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../../assets/checkinmap.png')} style={{ height: 200, width: Dimensions.get('window').width }} />
                        </View>
                    </View>

                    <View>
                        <LinearGradient
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            useAngle={true}
                            angle={180}
                            colors={['#5956D7', 'rgba(166,79,207,0.6)']}
                            style={{ height: 300, width: Dimensions.get('window').width, borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: 40 }}
                        >
                            <View style={{ margin: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={styles.photostext}>
                                        Comments
                                    </Text>
                                    <TouchableWithoutFeedback>
                                        <Text style={styles.viewall}>
                                            View All
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={styles.profileview}>
                                        <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={styles.commenttextinput}
                                            placeholder={'Leave comment here'}
                                            placeholderTextColor={'#A6AFAF'}

                                        />
                                        <View
                                            style={styles.sendbtn}
                                        >
                                            <TouchableWithoutFeedback

                                            >
                                                <FontAwesome name="send" size={15} color={'#646CE9'} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={styles.profileview}>
                                        <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                    </View>
                                    <View style={{ width: Dimensions.get('window').width - 100 }}>
                                        <Text style={styles.personname}>
                                            XYZ
                                        </Text>
                                        <Text style={styles.datetime}>
                                            May 24 at 9:22 PM
                                        </Text>
                                        <Text style={styles.commenttext}>
                                            Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, more...
                                        </Text>
                                    </View>
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
    checkinview: {
        width: 80,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#E4E6FB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    checkintext: {
        // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        color: '#646CE9',
    },
    locationtext: {
        // fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 12,
        marginTop: 2

    },
    restaurantdescription: {
        height: 150,
        width: Dimensions.get('window').width,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#ffffff',
        marginTop: -15
    },
    restaurantname: {
        // fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 21,
        color: '#646CE9',
    },
    additionaltext: {
        // fontFamily: '#Poppins',
        fontWeight: 'normal',
        fontSize: 10,
        lineHeight: 15,
        color: '#1F81B8',
    },
    phonenumber: {
        // fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
    },
    imagesocialicons: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    restaurantdescriptiontext: {
        // fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828'
    },
    moretext: {
        // fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        color: '#646CE9'
    },
    appereadontext: {
        // fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
        fontWeight: '600',
        margin: 10,
        marginBottom: 0,
    },
    episodeimageview: {
        height: 75,
        width: 75,
        margin: 10,
        marginBottom: 0,

    },
    episodeimage: {
        height: 70,
        width: 70,
        borderRadius: 10,
    },
    episodetitle: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 24,
        // fontFamily: 'Poppins',
        //marginTop: 10
    },
    episodeseason: {
        color: '#ffffff',
        fontSize: 10,
        lineHeight: 10,
        // fontFamily: 'Poppins',
    },
    featureddishes: {
        height: 265,
        width: Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        marginTop: -40,
        borderRadius: 10
    },
    featureddishestext: {
        color: '#9973BE',
        fontSize: 16,
        lineHeight: 24,
        // fontFamily: 'Poppins',
        fontWeight: '600',
    },
    dishview: {
        width: 44,
        height: 44,
        //marginLeft:20,
        marginRight: 10,
        //marginTop:20
    },
    dishimage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    dishheading: {
        color: '#646CE9',
        fontSize: 16,
        lineHeight: 20,
        // fontFamily: 'Poppins',
    },
    clicktoview: {
        color: '#282828',
        fontSize: 10,
        lineHeight: 10,
        // fontFamily: 'Poppins',
    },
    photostext: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 24,
        // fontFamily: 'Poppins',
    },
    viewall: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 18,
        // fontFamily: 'Poppins',
    },
    checkinsviewall: {
        color: '#282828',
        fontSize: 12,
        lineHeight: 18,
        // fontFamily: 'Poppins',
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
    checkinstext: {
        color: '#9973BE',
        fontSize: 16,
        lineHeight: 24,
        // fontFamily: 'Poppins',
    },
    checkinsview: {
        height: 220,
        width: Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        marginTop: -30,
        borderRadius: 10
    },
    profileview: {
        width: 44,
        height: 44,
        marginLeft: 20,
        marginRight: 10,
        //marginTop:20
    },
    profileimage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    commenttextinput: {
        width: Dimensions.get('window').width - 100,
        height: 28,
        marginLeft: 0,
        backgroundColor: '#F3F4F8',
        borderRadius: 18,
        marginTop: 5,
        fontSize: 10,
        paddingLeft: 10,
        paddingTop: 8,
        // fontFamily:'Poppins',

    },
    sendbtn: {
        // position:'absolute',
        marginLeft: -20,
        marginTop: 10

    },
    personname: {
        // fontFamily:'Poppins',
        fontSize: 14,
        lineHeight: 21,
        color: '#ffffff',
    },
    datetime: {
        // fontFamily:'Poppins',
        fontSize: 10,
        lineHeight: 15,
        color: '#ffffff',
    },
    commenttext: {
        // fontFamily:'Poppins',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
    },
    additionallocations: {
        // fontFamily:'Poppins',
        fontSize: 16,
        lineHeight: 24,
        color: '#9973BE',
    },
    liketext: {
        // fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
        textAlign: 'center',
        marginTop: 2
    }

});

