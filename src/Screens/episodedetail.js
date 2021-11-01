import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Episodedetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            margintop: 0,
            textcolor1: '#6A71DF',
            textcolor2: '#000000',
            showseason1: true,
            showseason2: false,
            bordercolor: '#6A71DF',
            slugvalue: this.props.route.params.slugvalue,
            episodedetails: '',
            restaurants: [],
            showloader: false,
        }
    }

    componentDidMount() {
        this.getepisodedetails()
    }

    changetextcolor(value) {
        if (value === '1') {
            this.setState({
                textcolor1: '#6A71DF',
                textcolor2: '#000000',
                showseason1: true,
                showseason2: false,
                // bordercolor1:'#6A71DF'
            })
        }
        if (value === '2') {
            this.setState({
                textcolor1: '#000000',
                textcolor2: '#6A71DF',
                showseason1: false,
                showseason2: true,
                // bordercolor1:'#6A71DF'
            })
        }
    }

    getepisodedetails = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://urls.tripledlife.com/api/v1/posts/posts/single/" + this.state.slugvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success == true) {
                    this.setState({ episodedetails: result.data })
                    for (let i = 0; i < result.data.restros.length; i++) {

                        this.state.restaurants.push(result.data.restros[i])
                    }
                    this.setState({ showloader: !this.state.showloader })
                }
            })
            .catch(error => console.log('error', error));
    }

    renderrestaurants = () => {
        return this.state.restaurants.map((item) => {
            return (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.restaurantimageview}>
                            <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                        </View>
                        <View>
                            <Text
                                style={styles.restauranttitle}
                            >
                                {/* Alfred Coffee 2 Go */}
                                {item.title}
                            </Text>
                            <Text style={styles.restaurantlocation}>
                                {/* California, United States */}
                                {item.address.state}, {item.address.country}
                            </Text>
                        </View>
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
                <View style={{ marginTop: Platform.OS == 'android' ? 15 : 35, marginLeft: 10, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Episodes')}
                    >
                        <Ionicons name="chevron-back-outline" size={40} />
                    </TouchableWithoutFeedback>

                    <Text style={styles.heading}>
                        {/* Totally fried */}
                        {this.state.episodedetails.title}
                    </Text>
                </View>

                <View>
                    <ScrollView>
                        <View>
                            <View >
                                <View style={styles.videoview}>
                                    <Thumbnail url={'https://www.youtube.com/watch?v=eVbt6oVkbdk'}
                                        imageWidth={Dimensions.get('window').width}
                                        imageHeight={200}
                                        //containerStyle={{width:75,height:75,borderRadius:10}}
                                        iconStyle={{ height: 20, width: 20 }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20, alignItems: 'center',marginTop:10 }}>
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
                                <View style={{ width: Dimensions.get('window').width - 100, }}>
                                    <Text style={styles.episodedate}>
                                        {/* Season 1 - Episode 1 | January 18, 2020 */}
                                        {this.state.episodedetails.post_code} | {this.state.episodedetails.publish_date}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ width: Dimensions.get('window').width, marginTop: 0 }}>
                                <Text style={styles.episodedescription}>
                                    {/* Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites. */}
                                    {this.state.episodedetails.description}
                                </Text>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                                <ScrollView>
                                    <TouchableWithoutFeedback
                                    //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                                    >
                                        <LinearGradient
                                            start={{ x: 0, y: 0.5 }}
                                            end={{ x: 1, y: 0.5 }}
                                            useAngle={true}
                                            angle={180}
                                            colors={['#5956D7', 'rgba(166,79,207,0.6)']}
                                            style={{ height: Dimensions.get('window').height / 3 + 50, width: Dimensions.get('window').width, borderRadius: 10, }}
                                        >
                                            <View>
                                                <Text style={styles.restaurantheading}>
                                                    Restaurants
                                                </Text>
                                            </View>
                                            {/*<View style={{ flexDirection: 'row' }}>
                                                <View style={styles.restaurantimageview}>
                                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                                                </View>
                                                <View>
                                                    <Text
                                                        style={styles.restauranttitle}
                                                    >
                                                        Alfred Coffee 2 Go
                                                    </Text>
                                                    <Text style={styles.restaurantlocation}>
                                                        California, United States
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                                <View style={styles.restaurantimageview}>
                                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                                                </View>
                                                <View>
                                                    <Text
                                                        style={styles.restauranttitle}
                                                    >
                                                        Alfred Coffee 2 Go
                                                    </Text>
                                                    <Text style={styles.restaurantlocation}>
                                                        California, United States
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                                <View style={styles.restaurantimageview}>
                                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                                                </View>
                                                <View>
                                                    <Text
                                                        style={styles.restauranttitle}
                                                    >
                                                        Alfred Coffee 2 Go
                                                    </Text>
                                                    <Text style={styles.restaurantlocation}>
                                                        California, United States
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                                <View style={styles.restaurantimageview}>
                                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                                                </View>
                                                <View>
                                                    <Text
                                                        style={styles.restauranttitle}
                                                    >
                                                        Alfred Coffee 2 Go
                                                    </Text>
                                                    <Text style={styles.restaurantlocation}>
                                                        California, United States
                                                    </Text>
                                                </View>
                                            </View>*/}
                                            {this.state.showloader ?
                                                this.renderrestaurants()
                                                :
                                                <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 3+50, width: Dimensions.get('window').width }}>
                                                    <ActivityIndicator size="large" color="#2e3191" />
                                                </View>
                                            }

                                        </LinearGradient>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>

                            <View>
                                <View style={{ width: Dimensions.get('window').width, backgroundColor: '#FDFDFD', borderRadius: 10, marginTop: -10, marginBottom: 80 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                                        {/* fontFamily:'Poppins', */}
                                        <Text style={{ color: '#9973BE', fontSize: 16, lineHeight: 24, }}>
                                            Comments
                                        </Text>
                                        <TouchableWithoutFeedback>
                                            {/* fontFamily:'Poppins', */}
                                            <Text style={{ fontSize: 12, lineHeight: 18, color: '#282828' }}>
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

                                    <View style={{ flexDirection: 'row', }}>
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
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        // fontFamily: 'Poppins',
        lineHeight: 30,
        color: '#646CE9',
        marginTop: 5,
    },

    episodetitle: {
        fontSize: 16,
        fontWeight: '500',
        // fontFamily: 'Poppins',
        lineHeight: 24,
        color: '#646CE9',
    },
    episodedescription: {
        fontSize: 12,
        fontWeight: '500',
        // fontFamily: 'Poppins',
        lineHeight: 18,
        color: '#282828',
        //flex: 1
        flexWrap: 'wrap',
        margin: 10,
        marginTop: 5,
    },
    episodedate: {
        fontSize: 14,
        fontWeight: 'normal',
        // fontFamily: 'Poppins',
        lineHeight: 21,
        color: '#646CE9',
        margin: 10,
        marginBottom: 0,
    },
    videoview: {
        height: 200,
        width: Dimensions.get('window').width,
        borderRadius: 10,
        marginTop: 0,
        backgroundColor: 'rgba(0,0,0,0.09)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    restaurantimageview: {
        height: 45,
        width: 45,
        margin: 10,
        marginBottom: 0,

    },
    restaurantimage: {
        height: 40,
        width: 40,
        borderRadius: 10,
    },
    restauranttitle: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 21,
        //  fontFamily: 'Poppins',
        marginTop: 10
    },
    restaurantlocation: {
        color: '#ffffff',
        fontSize: 10,
        lineHeight: 15,
        // fontFamily: 'Poppins',
        // marginTop:5
    },
    restaurantheading: {
        // fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
        fontWeight: '600',
        margin: 10,
        marginBottom: 0,
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
    },
    sendbtn: {
        // position:'absolute',
        marginLeft: -20,
        marginTop: 10

    },
    personname: {
        //  fontFamily:'Poppins',
        fontSize: 14,
        lineHeight: 21,
        color: '#282828',
    },
    datetime: {
        // fontFamily:'Poppins',
        fontSize: 10,
        lineHeight: 15,
        color: '#596768',
    },
    commenttext: {
        // fontFamily:'Poppins',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
    }

});

