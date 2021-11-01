import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { BASE_URL } from '../api';
import {getDistance, getPreciseDistance} from 'geolib';
import GetLocation from 'react-native-get-location'

export default class Checkinlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            showfulldetails: false,
            countFrom: 6,
            conditionalRender: false,
            slugvalue:this.props.route.params.slugvalue,
            locationstatus: '',
      currentLongitude: 0,
      currentLatitude: 0,
      userlatitude:0,
      userlongitude:0,
      distance:'',
      statename:'',
      country:'',
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
            listofcheckins:[],
            norecordfound:false,
            restaurantdetails:'',
        }
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
                <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => { this.clickEventListener() }}>
                    <Image style={styles.image} source={{ uri: (conditionalRender) ? images[3] : images[1] }} />
                </TouchableOpacity>
            </View>
        );
    }

    renderThree() {
        const { images } = this.state;
        const { countFrom } = this.state;
        const overlay = !countFrom || countFrom > 6 || images.length > countFrom && [5, 6].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
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



    componentDidMount() {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(location => {
              console.log('location from getlocation', location);
              this.setState({userlatitude:location.latitude, userlongitude:location.longitude})
            })
            .catch(error => {
              const { code, message } = error;
              console.warn(code, message);
            })
    }

    async componentWillMount() {
        await this.requestLocationPermission()

        await this.getcheckinlist();
    
      }

      getdistance =() => {

        console.log('coordinates',this.state.restaurantdetails.address.coordinates[0])
        console.log('coordinates',this.state.restaurantdetails.address.coordinates[1])
        
        var dis = getDistance(
            {latitude: this.state.userlatitude, longitude: this.state.userlongitude},
            {latitude: this.state.restaurantdetails.address.coordinates[0], longitude: this.state.restaurantdetails.address.coordinates[1]},
          );

          this.setState({distance:dis})
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
    

    getcheckinlist =() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(BASE_URL+"restaurants/checkin/"+this.state.slugvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result)
                if(result.success == true) {
                    this.state.listofcheckins.length == 0;
                    if(result.data.checkins.records.length == 0){
                        this.setState({norecordfound:!this.state.norecordfound})
                    }
                    else {
                        for (let i = 0; i < result.data.checkins.records.length; i++) {
            
                            this.state.listofcheckins.push(result.data.checkins.records[i])
                          }
                    }

                    this.setState({restaurantdetails:result.data.restaurantDetails, statename:result.data.restaurantDetails.address.state, country:result.data.restaurantDetails.address.country })
                    
                    console.log('restaurantdetails',this.state.restaurantdetails.address.state)

                    this.getdistance();
                }
            })
            .catch(error => console.log('error', error));
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
                                    Check Ins
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableWithoutFeedback>
                                <Ionicons name="search-outline" size={25} color={'#646CE9'} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15, }}>
                            <View style={styles.container}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.searchFilterFunction(text)}
                                    value={this.state.search}
                                    //underlineColorAndroid="transparent"
                                    placeholder="Search Here"
                                />
                                {/* <FlatList
                data={this.state.filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView(item)}
                renderItem={this.ItemView(item)}
                /> */}
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

                            <View style={{position:'absolute',top:Dimensions.get('window').height/5+10,left:Dimensions.get('window').width-50}}>
                                <TouchableWithoutFeedback
                                onPress={() =>this.props.navigation.navigate('Checkinsharelist')}
                                >
                                <Image source={require('../../assets/share.png')} style={{ height: 38, width: 38, }} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:15}}>
                        <View elevation={5} style={{
                            height: this.state.showfulldetails ? Dimensions.get('window').height - 100 : 100,
                            width: this.state.showfulldetails ? Dimensions.get('window').width - 30 : Dimensions.get('window').width - 90,
                            marginLeft: 10,
                            marginTop: 15,
                            backgroundColor: '#ffffff',
                            borderRadius: 10,
                            justifyContent: 'center',
                            marginBottom: 10
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.restaurantimageview}>
                                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                                </View>
                                <View style={{}}>
                                    <Text
                                        style={styles.restauranttitle}
                                    >
                                        {/* Alfred Coffee 2 Go */}
                                        {this.state.restaurantdetails.title}
                                    </Text>
                                    <Text style={styles.restaurantlocation}>
                                        {/* California, United States */}
                                        {this.state.statename},  {this.state.country}
                                    </Text>
                                    <Text style={styles.visitedontext}>
                                        Visited on 13 April, 2020
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Image source={require('../../assets/miles.png')} style={{ height: 12, width: 12, marginRight: 5, marginTop: 3 }} />
                                        <Text style={styles.miles}>
                                            {/* 2 miles */}
                                            {this.state.distance} miles
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 100,
                                    width: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderLeftColor: this.state.showfulldetails ? '' : '#DDDDDD',
                                    borderLeftWidth: this.state.showfulldetails ? 0 : 1,
                                    right: 0,
                                    position: 'absolute'
                                }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.setState({ showfulldetails: !this.state.showfulldetails })}
                                    >
                                        {this.state.showfulldetails ?
                                            <MaterialCommunityIcons name="chevron-up" size={20} color={'#5956D7'} /> :
                                            <MaterialCommunityIcons name="chevron-down" size={20} color={'#5956D7'} />
                                        }
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            {this.state.showfulldetails ?
                                <View style={{marginBottom:80}}>

                                    <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15 }}>
                                        {[1, 3, 4].includes(imagesToShow.length) && this.renderOne()}
                                        {imagesToShow.length >= 3 && imagesToShow.length != 4 && this.renderTwo()}
                                        {imagesToShow.length >= 4 && this.renderThree()}
                                    </View>
                                    <View style={{marginLeft:15,marginRight:15,marginTop:15}}>
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
                          
                                    <View style={styles.badgesview}>
                                        <View style={styles.badgetextview}>
                                            <Text style={styles.badgetext}>
                                                Badges Earned:
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: 'center', }}>
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
                                : null
                            }
                        </View>
                        <View>
                            <TouchableWithoutFeedback>
                                <View style={{width:28,height:28, borderRadius:14, borderColor:'#5956D7',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                                <MaterialIcons name="more-horiz" size={20} color={'#5956D7'} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        </View>

                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    badgesview: {
        //height: 120,
        width: Dimensions.get('window').width - 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 10,
        backgroundColor: '#ffffff',
       
    },
    badgetextview: {
        height: 24,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //backgroundColor:'#5956D7',
        marginTop: 0,
        justifyContent: 'center',
        marginLeft: 10,
        // marginRight:1
    },
    badgetext: {
       // fontFamily: 'Poppins',
        fontWeight: '500',
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
    // cardview: {
    //     //position: 'absolute',
    //     height: this.state.showfulldetails?Dimensions.get('window').height/2:100,
    //     width: Dimensions.get('window').width - 90,
    //     marginLeft: 10,
    //     marginTop: 15,
    //     backgroundColor: '#ffffff',
    //     borderRadius: 10,
    //     justifyContent:'center',

    // },
    restaurantimageview: {
        height: 85,
        width: 85,
        margin: 10,
        marginBottom: 0,

    },
    restaurantimage: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    restauranttitle: {
        color: '#646CE9',
        fontSize: 14,
        lineHeight: 16,
       // fontFamily: 'Poppins',
        marginTop: 10,
        width:Dimensions.get('window').width/2-20,
        flexWrap:'wrap',
        flexGrow:1,
    },
    restaurantlocation: {
        color: '#282828',
        fontSize: 12,
        lineHeight: 15,
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
    visitedontext: {
        fontSize: 10,
        fontWeight: 'normal',
       // fontFamily: 'Poppins',
        lineHeight: 15,
        color: '#7B8587',
    },
    // arrowview: {
    //     height: 100,
    //     width: 30,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderLeftColor: '#DDDDDD',
    //     borderLeftWidth: 1,
    //     right: 0,
    //     position: 'absolute'
    // },
    row: {
        flexDirection: 'row'
    },
    imageContent: {
        // borderWidth:1,
        // borderColor:'black',
        height: 100,
        width: Dimensions.get('window').width / 3 - 20,
        borderRadius: 10,
    },
    imageContent1: {
        width: '100%'
    },
    imageContent2: {
        width: '33.33%',
    },
    imageContent3: {
        width: '33.33%',
    },
    image: {
        width: Dimensions.get('window').width / 3 - 25,
        height: 96,
        borderRadius: 10,
    },
    //overlay efect
    overlayContent: {
        flex: 1,
        position: 'absolute',
        zIndex: 100,
        //right: 0,
        width: Dimensions.get('window').width / 3 - 25,
        height: 96,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    count: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 139, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    checkindescription: {
        fontSize: 12,
        fontWeight: '400',
       // fontFamily: 'Poppins',
        lineHeight: 18,
        color: '#282828',
    },
    disheseatentext: {
        //fontFamily: 'Poppins',
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







});