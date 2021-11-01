import React, { useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Image, Text, Platform, Dimensions } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import { Thumbnail } from 'react-native-thumbnail-video';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';



export default class Blogdetailvideo extends React.Component {
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
                <View style={{ marginTop: Platform.OS =='android'? 15:35, marginLeft: 10, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                    // onPress={() => this.props.navigation.navigate('Episodes')}
                    >
                        <Ionicons name="chevron-back-outline" size={40} />
                    </TouchableWithoutFeedback>

                    <Text style={styles.heading}>
                        Blog
                    </Text>
                </View>

                <ScrollView>
                    <View>
                        

                        <View>
                            
                                <View style={styles.imageview}>
                                <YoutubePlayer
                                        height={Dimensions.get('window').height/3}
                                        width={Dimensions.get('window').width-30}
                                        play={false}
                                        videoId={'84WIaK3bl_s'}
                                       // onChangeState={this.onChangeState()}
                                       style={{borderRadius:10}}
                                    />
                                </View>
                                <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }}>
                                    <Text style={styles.restauranttitle}>
                                        Stylish Cafes
                                    </Text>
                                    <Text style={styles.date}>
                                        April 13,2020
                                    </Text>
                                    <Text style={styles.description}>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                    </Text>
                                </View>
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
        height: Dimensions.get('window').height/3,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:15,
        marginRight:15,
    },
    image: {
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').height/3-5,
        borderRadius:10,
    },
    restauranttitle: {
       // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
        color: '#646CE9',
    },
    date: {
       // fontFamily: 'Poppins',
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
        marginTop:5,
    }

});

