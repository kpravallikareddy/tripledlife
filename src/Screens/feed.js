import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity, Button, ScrollView, ActivityIndicator, } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../api';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latestnewstextcolor: '#596768',
            latestnewsbordercolor: '#6A71DF',
            checkinstextcolor: '#282828',
            checkinsbordercolor: '',
            latestnewsselected: true,
            checkinsselected: false,
            countFrom: 5,
            conditionalRender: false,
            images: [
                "https://bootdey.com/img/Content/avatar/avatar1.png",
                "https://bootdey.com/img/Content/avatar/avatar6.png",
                "https://bootdey.com/img/Content/avatar/avatar8.png",
                "https://bootdey.com/img/Content/avatar/avatar7.png",
                "https://bootdey.com/img/Content/avatar/avatar5.png",
                "https://bootdey.com/img/Content/avatar/avatar6.png",
                "https://bootdey.com/img/Content/avatar/avatar4.png",
                "https://bootdey.com/img/Content/avatar/avatar1.png",
                "https://bootdey.com/img/Content/avatar/avatar2.png",
                "https://bootdey.com/img/Content/avatar/avatar3.png",
            ],
            featurednews: [],
            norecordfound: false,
            showloader:false,
        }
    }




    componentDidMount() {
        //console.log('splash')
        this.getfeaturednews();

    }

    clickEventListener = () => {
        Alert.alert('Alert', 'image clicked');
    }

    renderOne() {
        const { images } = this.state;
        const { countFrom } = this.state;
        return (
            <View style={styles.row}>
                <TouchableOpacity style={[styles.imageContent, styles.imageContent1]} onPress={() => { this.clickEventListener() }}>
                    <Image style={styles.image} source={{ uri: images[0] }} />
                </TouchableOpacity>
            </View>
        );
    }


    renderTwo() {
        const { images } = this.state;
        const { countFrom } = this.state;
        const conditionalRender = [3, 4].includes(images.length) || images.length > +countFrom && [3, 4].includes(+countFrom);

        return (
            <View style={styles.row}>
                <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => { this.clickEventListener() }}>
                    <Image style={styles.image} source={{ uri: (conditionalRender) ? images[1] : images[0] }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => { this.clickEventListener() }}>
                    <Image style={styles.image} source={{ uri: (conditionalRender) ? images[2] : images[1] }} />
                </TouchableOpacity>
            </View>
        );
    }

    renderThree() {
        const { images } = this.state;
        const { countFrom } = this.state;
        const overlay = !countFrom || countFrom > 5 || images.length > countFrom && [4, 5].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
        const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;

        return (
            <View style={styles.row}>
                <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.clickEventListener() }}>
                    <Image style={styles.image} source={{ uri: (conditionalRender) ? images[1] : images[2] }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.clickEventListener() }}>
                    <Image style={styles.image} source={{ uri: (conditionalRender) ? images[2] : images[3] }} />
                </TouchableOpacity>
                {overlay}
            </View>
        );
    }

    renderOverlay() {
        const { images } = this.state;
        return (
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.clickEventListener() }}>
                <Image style={styles.image} source={{ uri: images[images.length - 1] }} />
            </TouchableOpacity>
        );
    }

    renderCountOverlay(more) {
        const { images } = this.state;
        const { countFrom } = this.state;
        const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
        const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;
        return (
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.clickEventListener() }}>
                <Image style={styles.image} source={{ uri: (conditionalRender) ? images[3] : images[4] }} />
                <View style={styles.overlayContent}>
                    <View>
                        <Text style={styles.count}>+{extra}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    getfeaturednews = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "posts/posts?type=post&featured=yes", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success == true) {
                    this.state.featurednews.length == 0;
                    if (result.data.records.length == 0) {
                        this.setState({ norecordfound: !this.state.norecordfound })
                    }
                    else {
                        for (let i = 0; i < result.data.records.length; i++) {

                            this.state.featurednews.push(result.data.records[i])
                        }

                        this.setState({showloader:!this.state.showloader})
                    }
                }
                console.log('featured news', this.state.featurednews)
            })
            .catch(error => console.log('error', error));
    }


    renderfeaturednews = () => {
        return this.state.featurednews.map((item) => {
            return (
                <View style={{ marginBottom: 10 }}>
                    <View elevation={5} style={styles.newsfeedview}>
                        <View>
                            <Image
                                source={{ uri: item.image[0] }}
                                // source={require('../../assets/restaurant.jpeg')}
                                style={styles.newsfeedimage}
                            />

                        </View>
                    </View>

                    <View elevation={5} style={styles.newsfeedtextview}>
                        <View style={{ marginLeft: 10, marginTop: 0 }}>
                            <Text style={styles.newsfeedtitle}>
                                {/* Arieta Library, Bakery & Cafe */}
                                {item.title}
                            </Text>
                            <Text style={styles.newsfeeddescription}>
                                {/* Lorem Ipsum is simply dummy text of the printing and typesetting. */}
                                {item.description}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View style={{ height: 1, width: Dimensions.get('window').width - 60, backgroundColor: '#E7E7E7', }}>

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft:30,marginRight:30,justifyContent:'space-between',alignItems:'center'}}>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name="thumbs-up" size={20} color={'#646CE9'} style={{ marginRight: 5 }} />
                                    <Text style={styles.liketext}>
                                        Like({item.likes})
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome name="commenting" size={20} color={'#838383'} style={{ marginRight: 5 }} />
                                    <Text style={styles.liketext}>
                                        Comment({item.totalComments})
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={styles.profileview}>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='Leave comment here'
                                    style={styles.commenttextinput}

                                />
                                <View style={styles.sendbtn}>
                                    <TouchableWithoutFeedback
                                    >
                                        <FontAwesome name="send" size={15} color={'#646CE9'} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            )
        })
    }

    renderfeature = () => {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <View elevation={5} style={styles.newsfeedview}>
                        <View>
                            <Image
                                source={require('../../assets/restaurant.jpeg')}
                                style={styles.newsfeedimage}
                            />

                        </View>
                    </View>

                    <View elevation={5} style={styles.newsfeedtextview}>
                        <View style={{ marginLeft: 10, marginTop: 0 }}>
                            <Text style={styles.newsfeedtitle}>
                                Arieta Library, Bakery & Cafe
                            </Text>
                            <Text style={styles.newsfeeddescription}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={styles.profileview}>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='Leave comment here'
                                    style={styles.commenttextinput}

                                />
                                <View style={styles.sendbtn}>
                                    <TouchableWithoutFeedback
                                    >
                                        <FontAwesome name="send" size={15} color={'#646CE9'} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <View elevation={5} style={styles.newsfeedview}>
                        <View>
                            <Image
                                source={require('../../assets/restaurant.jpeg')}
                                style={styles.newsfeedimage}
                            />

                        </View>
                    </View>

                    <View elevation={5} style={styles.newsfeedtextview}>
                        <View style={{ marginLeft: 10, marginTop: 0 }}>
                            <Text style={styles.newsfeedtitle}>
                                Arieta Library, Bakery & Cafe
                            </Text>
                            <Text style={styles.newsfeeddescription}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={styles.profileview}>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='Leave comment here'
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
                    </View>
                </View>
            </View>
        )
    }

    render() {

        const { modal, index, countFrom } = this.state;
        const { images } = this.state;
        const imagesToShow = [...images];

        if (countFrom && images.length > countFrom) {
            imagesToShow.length = countFrom;
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    //alignItems: 'center',

                }}
            >
                <ScrollView>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: Platform.OS == 'android' ? 20 : 40 }}>
                            <Text style={styles.featurednews}>
                                Featured News
                            </Text>
                            <MaterialCommunityIcons name="bell" size={30} color="#6B71DF" />
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
                            <ScrollView horizontal={true}>
                                <View style={styles.imageview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.photoview} />
                                </View>
                                <View style={styles.imageview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.photoview} />
                                </View>
                                <View style={styles.imageview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.photoview} />
                                </View>
                                <View style={styles.imageview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.photoview} />
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <View>
                                <View style={styles.latestnewsview}>
                                    <TouchableWithoutFeedback
                                        style={{ flexDirection: 'row', borderBottomColor: this.state.latestnewsselected ? '#6A71DF' : '', borderBottomWidth: this.state.latestnewsselected ? 2 : 0, width: Dimensions.get('window').width / 2 - 15, height: 30, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => this.setState({ latestnewsselected: true, checkinsselected: false })}
                                    >
                                        <Image source={require('../../assets/newsfeed.png')} style={{ width: 14, height: 15, marginTop: 3, marginRight: 5 }} />
                                        {/* fontFamily: 'Poppins', */}
                                        <Text style={{ fontWeight: '500', fontSize: 14, color: this.state.latestnewsselected ? this.state.latestnewstextcolor : '#282828', }}>
                                            Latest News
                                        </Text>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        style={{ flexDirection: 'row', borderBottomColor: this.state.checkinsselected ? '#6A71DF' : '', borderBottomWidth: this.state.checkinsselected ? 2 : 0, width: Dimensions.get('window').width / 2 - 15, height: 30, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => this.setState({ latestnewsselected: false, checkinsselected: true })}
                                    >
                                        <MaterialIcons name="location-pin" size={15} color={'#282828'} style={{ marginRight: 5, marginLeft: 0, marginTop: 0 }} />
                                        {/* fontFamily: 'Poppins', */}
                                        <Text style={{ fontWeight: '500', fontSize: 14, color: '#282828', }}>
                                            Check Ins
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            {this.state.latestnewsselected ?
                                <View>
                                    <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, }}>
                                        <View style={styles.container}>
                                            <TextInput
                                                style={styles.textInputStyle}
                                                onChangeText={(text) => this.searchFilterFunction(text)}
                                                value={this.state.search}
                                                //underlineColorAndroid="transparent"
                                                placeholder="Search Here"
                                            />

                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                                            <TouchableWithoutFeedback>
                                                <Image source={require('../../assets/filter.png')} style={{ height: 20, width: 20, marginRight: 10 }} />
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback>
                                                {/* fontFamily: 'Poppins' */}
                                                <Text style={{ color: '#282828', fontSize: 14, }}>
                                                    Filter
                                                </Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                    {this.state.showloader ?
                                        <View>
                                            {this.renderfeaturednews()}
                                        </View>
                                        :
                                        <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
                                            <ActivityIndicator size="large" color="#2e3191" />
                                        </View>
                                    }

                                </View>
                                :
                                this.state.checkinsselected ?
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, }}>
                                            <View style={styles.container}>
                                                <TextInput
                                                    style={styles.textInputStyle}
                                                    onChangeText={(text) => this.searchFilterFunction(text)}
                                                    value={this.state.search}
                                                    //underlineColorAndroid="transparent"
                                                    placeholder="Search Here"
                                                />

                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                                                <TouchableWithoutFeedback>
                                                    <Image source={require('../../assets/filter.png')} style={{ height: 20, width: 20, marginRight: 10 }} />
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback>
                                                    {/* fontFamily: 'Poppins' */}
                                                    <Text style={{ color: '#282828', fontSize: 14, }}>
                                                        Filter
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>

                                        <View style={styles.checkinview}>
                                            <View style={{ flexDirection: 'row', marginTop: 10, width: Dimensions.get('window').width - 50, height: 50, justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.profileview}>
                                                        <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.personname}>
                                                            XYZ
                                                        </Text>
                                                        <Text style={styles.datetime}>
                                                            May 24 at 9:22 PM
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View >
                                                    <TouchableWithoutFeedback>
                                                        <Feather name="more-horizontal" size={30} />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            </View>

                                            <View>

                                                {/* style={{flexDirection:'row'}} */}
                                                {/* <View style={{flexDirection:'row',}}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={{height:100,width:Dimensions.get('window').width/2-19,marginRight:5}} />
                                                <Image source={require('../../assets/restaurant.jpeg')} style={{height:100,width:Dimensions.get('window').width/2-19,}} />
                                                </View>
                                                <View style={{flexDirection:'row',marginTop:5}}>
                                                <Image source={require('../../assets/restaurant.jpeg')} style={{height:100,width:Dimensions.get('window').width/4+20,marginRight:5}} />
                                                <Image source={require('../../assets/restaurant.jpeg')} style={{height:100,width:Dimensions.get('window').width/4+20,marginRight:5}} />
                                                <Image source={require('../../assets/restaurant.jpeg')} style={{height:100,width:Dimensions.get('window').width/4+20,}} />
                                                </View> */}
                                                <View style={{ marginVertical: 20 }}>
                                                    {[1, 3, 4].includes(imagesToShow.length) && this.renderOne()}
                                                    {imagesToShow.length >= 2 && imagesToShow.length != 4 && this.renderTwo()}
                                                    {imagesToShow.length >= 4 && this.renderThree()}
                                                </View>
                                                <View style={{ marginLeft: 10, marginTop: 10 }}>
                                                    <Text style={styles.checkintitle}>
                                                        Arieta Library, Bakery & Cafe
                                                    </Text>
                                                    <Text style={styles.checkinaddress}>
                                                        Portland QR
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                        <Image source={require('../../assets/miles.png')} style={{ height: 12, width: 12, marginRight: 5, marginTop: 3 }} />
                                                        <Text style={styles.miles}>
                                                            5 miles
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.checkindescription}>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting.
                                                    </Text>
                                                </View>
                                                <View>
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                                                        <Text style={styles.disheseatentext}>
                                                            Dishes Eaten:
                                                        </Text>
                                                        <View style={styles.dishview}>
                                                            <Text style={styles.dishtitle}>
                                                                Pizza
                                                            </Text>
                                                        </View>
                                                        <View style={styles.dishview}>
                                                            <Text style={styles.dishtitle}>
                                                                Burger
                                                            </Text>
                                                        </View>
                                                        <View style={styles.dishview}>
                                                            <Text style={styles.dishtitle}>
                                                                Noodles
                                                            </Text>
                                                        </View>
                                                        <View style={styles.dishview}>
                                                            <Text style={styles.dishtitle}>
                                                                Cheese Sandwhich
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={styles.badgeearnedtext}>
                                                        Badge Earned:
                                                    </Text>
                                                    <View>
                                                        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10, alignItems: 'center', justifyContent: 'space-evenly' }}>
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
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    : null
                            }

                        </View>



                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    featurednews: {
        // fontFamily: 'Poppins',
        fontSize: 18,
        lineHeight: 27,
        fontWeight: '600',
    },
    imageview: {
        height: 120,
        width: 110,
        borderRadius: 10,
    },
    photoview: {
        height: 115,
        width: 105,
        borderRadius: 10,
        marginRight: 20,
    },
    latestnewsview: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 30,
        justifyContent: 'space-around',
        height: 30,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    container: {

    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        width: Dimensions.get('window').width - 100,
        height: 38,
        marginLeft: 10,
        backgroundColor: '#EEEFFA',
        borderRadius: 10,
        paddingLeft: 20,
    },
    newsfeedview: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width - 30,
        borderRadius: 10,
        marginTop: 15,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    newsfeedtitle: {
        // fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        color: '#282828',
        lineHeight: 21,
    },
    newsfeedimage: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 10
    },
    newsfeedtextview: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 4,
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        //alignItems: 'center',
        //justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        //marginTop: -142,
    },
    newsfeeddescription: {
        // fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#282828',
        marginTop: 10
    },
    profileview: {
        width: 44,
        height: 44,
        marginLeft: 10,
        marginRight: 10,
        //marginTop:20
    },
    profileimage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    commenttextinput: {
        width: Dimensions.get('window').width - 120,
        height: 28,
        marginLeft: 0,
        backgroundColor: '#F3F4F8',
        borderRadius: 18,
        marginTop: 5,
        fontSize: 10,
        color: '#A6AFAF',
        // fontFamily: 'Poppins',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    sendbtn: {
        // position:'absolute',
        marginLeft: -20,
        marginTop: 10

    },
    checkinview: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width - 30,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,

    },
    personname: {
        // fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
    },
    datetime: {
        // fontFamily: 'Poppins',
        fontSize: 10,
        lineHeight: 15,
        color: '#282828',
    },
    row: {
        flexDirection: 'row'
    },
    imageContent: {
        borderWidth: 1,
        borderColor: 'black',
        height: 120,
    },
    imageContent1: {
        width: '100%'
    },
    imageContent2: {
        width: '50%',
    },
    imageContent3: {
        width: '33.33%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    //overlay efect
    overlayContent: {
        flex: 1,
        position: 'absolute',
        zIndex: 100,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 139, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    checkintitle: {
        // fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 21,
        color: '#282828',
    },
    checkinaddress: {
        // fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 18,
        color: '#596768',
    },
    miles: {
        fontSize: 12,
        fontWeight: '400',
        // fontFamily: 'Poppins',
        lineHeight: 18,
        color: '#282828',

    },
    checkindescription: {
        fontSize: 12,
        fontWeight: '400',
        // fontFamily: 'Poppins',
        lineHeight: 18,
        color: '#282828',
    },
    disheseatentext: {
        // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
        marginLeft: 10,
    },
    dishview: {
        alignSelf: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 1,
        paddingTop: 1,
        borderWidth: 1,
        borderColor: '#646CE9',
        borderRadius: 15,
        marginLeft: 10,
        marginBottom: 5,
    },
    dishtitle: {
        // fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#646CE9'
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


});