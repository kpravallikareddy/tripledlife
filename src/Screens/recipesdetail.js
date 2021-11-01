import React, { useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Image, Text, Platform, Dimensions,TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Recipesdetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            margintop: 0,

        }
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}
            >
                <View style={{ marginTop:Platform.OS=='android'? 15:30, marginLeft: 10, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                    // onPress={() => this.props.navigation.navigate('Episodes')}
                    >
                        <Ionicons name="chevron-back-outline" size={40} />
                    </TouchableWithoutFeedback>

                    <Text style={styles.heading}>
                        Blueberry Breakfast Cake
                    </Text>
                </View>

                <ScrollView>
                    <View>
                        <View style={styles.imageview}>
                            <Image source={require('../../assets/restaurant.jpeg')} style={styles.image} />
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20, alignItems: 'center',marginTop:5 }}>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name="thumbs-up" size={20} color={'#646CE9'} style={{ marginRight: 5 }} />
                                    <Text style={styles.liketext}>
                                        Like(5)
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome name="commenting" size={20} color={'#838383'} style={{ marginRight: 5 }} />
                                    <Text style={styles.liketext}>
                                        Comment(10)
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
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 0 }}>
                            <View style={{ height: 1, width: Dimensions.get('window').width - 30, backgroundColor: '#E7E7E7', }}>

                            </View>
                        </View>
                        <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }}>
                            <Text style={styles.description}>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
                            </Text>
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
                                    style={{ height: 130, width: Dimensions.get('window').width, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: 30 }}
                                >
                                    <View style={{ marginLeft: 10 }}>
                                        <View>
                                            <Text style={styles.restauranttext}>
                                                Restaurants
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.restaurantimageview}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                                            </View>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text
                                                    style={styles.restaurantname}
                                                >
                                                    Alfred Coffee 2 Go
                                                </Text>
                                                <Text style={styles.restaurantlocation}>
                                                    California, United States
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.apperedonview}>
                            <View style={{ marginLeft: 10 }}>
                                <View>
                                    <Text style={styles.appereadontext}>
                                        Appeared On
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.episodeimageview}>
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
                                    </View>
                                </View>
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
                                    style={{ height: Dimensions.get('window').height/3, width: Dimensions.get('window').width, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: -5 }}
                                >
                                    <View style={{ marginLeft: 10 }}>
                                        <View>
                                            <Text style={styles.restauranttext}>
                                                Ingredients
                                            </Text>
                                        </View>
                                        <View>
                                            <View>
                                                <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:20,marginRight:30,marginTop:15}}>
                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Blueberries
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                1 1/4 cups
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Unsalted Butter
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                Melted 1 Brick
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>

                                                <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:20,marginRight:30,marginTop:15}}>
                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Blueberries
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                1 1/4 cups
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Unsalted Butter
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                Melted 1 Brick
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>

                                                <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:20,marginRight:30,marginTop:15}}>
                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Blueberries
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                1 1/4 cups
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Unsalted Butter
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                Melted 1 Brick
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:20,marginRight:30,marginTop:15}}>
                                                    <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Blueberries
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                1 1/4 cups
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    {/* <View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <View style={styles.pointerview}>
                                                                
                                                            </View>
                                                            <View>
                                                            <Text style={styles.ingredient}>
                                                                Unsalted Butter
                                                            </Text>
                                                            <Text style={styles.measure}>
                                                                Melted 1 Brick
                                                            </Text>
                                                            </View>
                                                        </View>
                                                    </View> */}

                                                </View>
                                            </View>
                                        </View>
                                          
                                    </View>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.directionview}>
                            <View style={{marginLeft:15,marginRight:15,marginTop:15}}>
                            <Text style={styles.directiontext}>
                                Direction
                            </Text>
                            <Text style={styles.steps}>
                                1.There are many variations of passages of Lorem Ipsum available, but the majority have suffered so
                            </Text>
                            <Text style={styles.steps}>
                                2.There are many variations of passages of Lorem Ipsum available, but the majority have suffered so
                            </Text>
                            <Text style={styles.steps}>
                                3.There are many variations of passages of Lorem Ipsum available, but the majority have suffered so
                            </Text>
                            <Text style={styles.steps}>
                                4.There are many variations of passages of Lorem Ipsum available, but the majority have suffered so
                            </Text>
                            </View>
                        </View>

                        <View>
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                useAngle={true}
                                angle={180}
                                colors={['#5956D7', 'rgba(166,79,207,0.6)']}
                                style={{ height: 300, width: Dimensions.get('window').width, borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: -10 }}
                            >
                                <View style={{ margin: 15 }}>
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

                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: '600',
       // fontFamily: 'Poppins',
        lineHeight: 30,
        color: '#646CE9',
        marginTop: 5,
    },

    // blogview: {
    //     width: Dimensions.get('window').width - 30,
    //     height: Dimensions.get('window').height / 2 - 50,
    //     borderRadius: 10,
    //     // borderWidth:1,
    //     marginLeft: 15,
    //     marginRight: 15,
    //     marginBottom: 10,

    // },
    imageview: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    image: {
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').height / 3 - 5,
        borderRadius: 10,
    },
    restauranttitle: {
       // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
        color: '#646CE9',
    },
    date: {
      //  fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: 10,
        lineHeight: 15,
        color: '#7B8587',
    },
    description: {
       // fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
        marginTop: 5,
    },
    restauranttext: {
       // fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
        fontWeight: '600',
        margin: 10,
        marginBottom: 0,
    },
    restaurantimageview: {
        height: 55,
        width: 55,
        margin: 10,
        marginBottom: 0,

    },
    restaurantimage: {
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    restaurantname: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 21,
       // fontFamily: 'Poppins',
        //marginTop: 10
    },
    restaurantlocation: {
        color: '#282828',
        fontSize: 10,
        lineHeight: 10,
       // fontFamily: 'Poppins',
    },
    apperedonview: {
        height: 140,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#ffffff',
        marginTop: -5
    },
    appereadontext: {
       // fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        color: '#9973BE',
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
        color: '#646CE9',
        fontSize: 16,
        lineHeight: 24,
       // fontFamily: 'Poppins',
        //marginTop: 10
    },
    episodeseason: {
        color: '#7B8587',
        fontSize: 10,
        lineHeight: 10,
       // fontFamily: 'Poppins',
    },
    ingredient:{
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 13,
       // fontFamily: 'Poppins',
    },
    measure:{
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 13,
       // fontFamily: 'Poppins',
    },
    pointerview:{
        width:11,
        height:2,
        backgroundColor:'#282828', 
        marginRight:10,
    },
    directionview:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height/3,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginTop:-5,
        backgroundColor:'#ffffff'
    },
    directiontext:{
        color: '#9973BE',
        fontSize: 16,
        lineHeight: 24,
       // fontFamily: 'Poppins',
    },
    steps:{
        color: '#282828',
        fontSize: 12,
        lineHeight: 18,
       // fontFamily: 'Poppins',
    },
    profileview:{
        width:44,
    height:44,
    //marginLeft:20,
    marginRight:10,
//marginTop:20
},
    profileimage:{
        width:40,
    height:40,
    borderRadius:20
},
    commenttextinput:{
        width:Dimensions.get('window').width-100,
    height:28,
    marginLeft:0,
    backgroundColor:'#F3F4F8',
    borderRadius:18,
    marginTop:5,
    fontSize:10,
    paddingLeft:10,
    paddingTop:8,
   // fontFamily:'Poppins',

},
    sendbtn:{
        // position:'absolute',
        marginLeft:-20,
    marginTop:10

},
    personname:{
   // fontFamily:'Poppins',
    fontSize:14,
    lineHeight:21,
    color:'#ffffff',
},
    datetime:{
   // fontFamily:'Poppins',
    fontSize:10,
    lineHeight:15,
    color:'#ffffff',
},
    commenttext:{
   // fontFamily:'Poppins',
    fontSize:12,
    lineHeight:18,
    color:'#282828',
},
photostext: {
    color: '#ffffff',
fontSize: 16,
lineHeight: 24,
//fontFamily: 'Poppins',
},
viewall: {
    color: '#ffffff',
fontSize: 12,
lineHeight: 18,
//fontFamily: 'Poppins',
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

