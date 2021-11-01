import React, { useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Image, Text, Platform, Dimensions,ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import { Thumbnail } from 'react-native-thumbnail-video';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../api';
import {getDistance, getPreciseDistance} from 'geolib';

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      margintop: 0,
      locationstatus: '',
      currentLongitude: 0,
      currentLatitude: 0,
      search: '',
      filterDataSource: [],
      masterDataSource: [],
      listofrestaurants:[],
      showloader:false,
      userlatitude:0,
      userlongitude:0,
      distance:'',
      coordinates:[],
      distances:[],
      searchvalue:'',
      seachlocation:'',
      seachresults:[],
    }
  }

  searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = this.state.masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      this.setState({ filterDataSource: newData });
      this.setState({ search: text });
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      this.setState({ filterDataSource: this.state.masterDataSource });
      this.setState({ search: text });
    }
  };




  componentDidMount() {

    //this.requestLocationPermission();

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

   await this.getrestaurants()
  
  }

  getdistance =() => {

    console.log('coordinates',this.state.listofrestaurants[0].address.coordinates[0])
    console.log('coordinates',this.state.listofrestaurants[0].address.coordinates[1])

    for(let i=0;i<this.state.listofrestaurants.length;i++){
    var dis = getDistance(
      {latitude: this.state.userlatitude, longitude: this.state.userlongitude},
      {latitude: this.state.listofrestaurants[i].address.coordinates[0], longitude: this.state.listofrestaurants[i].address.coordinates[1]},
    );
      this.state.distances.push(dis);
    }
    //return dis
   // this.setState({distance:dis})

   //console.log('distances', this.state.distances)
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

  ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  
  getrestaurants=() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(BASE_URL+"restaurants?page=0&limit=10&unit=miles", requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result)
       // if(result.statusCode == 200){
        this.state.listofrestaurants.length ==0
          for (let i = 0; i < result.data.length; i++) {
            
            this.state.listofrestaurants.push(result.data[i])
          }
         
          this.setState({showloader:!this.state.showloader})

          this.getdistance()
        //}
        console.log('restaurants',this.state.listofrestaurants)
        //console.log('coordinates',this.state.coordinates)
      })
      .catch(error => console.log('error', error));
  }


  searchwithstring =() => {

    //console.log('userlat',this.state.userlatitude)
    //console.log('userlong',this.state.userlongitude)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
     fetch(BASE_URL+"restaurants?limit=4&page=1&lat="+this.state.userlatitude+"&lon="+this.state.userlongitude+"&loc=&q="+this.state.searchvalue, requestOptions)
    //fetch("https://urls.tripledlife.com/api/v1/restaurants?limit=4&page=1&lat=26.858726299999997&lon=75.7720215&loc=&q="+this.state.searchvalue, requestOptions)
    .then(response => response.json())
      .then(result => {
        //console.log(result)
        this.state.seachresults.length ==0;
        if(result.success == true){
          for (let i = 0; i < result.data.length; i++) {
            
            this.state.seachresults.push(result.data[i])
          }
        }
      })
      .catch(error => console.log('error', error));
  }

  createsearch =() =>{
    return this.state.seachresults.map((item) =>{
    return (
        <TouchableOpacity
        style={{height:80,width:Dimensions.get('window').width}}
        onPress={() =>this.props.navigation.navigate('Restaurantdetail',{id:item.slug})}
        >
        <View style={{flexDirection:'row',marginLeft:20, alignItems:'center',marginRight:10, }}>
        <Image source={{ uri: item.image }} style={{ height: 70, width: 70,marginRight:10, marginLeft:10 }} />
        <View style={{width:Dimensions.get('window').width-100, flexWrap:'wrap',marginRight:10}}>
      <Text>{item.title}  </Text>  
      {/* <Text>({item.category_name}) </Text> */}
      {/* {item.brand_title} */}
      </View>
      </View>
    </TouchableOpacity>
    )
})
}

  renderrestaurants = () => {
    return this.state.listofrestaurants.map((item) => {
     
      return (
        <View>
          <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Restaurantdetail',{slugvalue:item.slug})}
              >
                <View style={styles.restaurantview}>
                {/* source={require('../../assets/restaurant.jpeg')} */}
                  <Image source={{uri:item.image}} style={styles.restaurantimage} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Restaurantdetail',{slugvalue:item.slug})}
              >
                <View style={{ width: Dimensions.get('window').width - 100, height: 75 }}>
                  <Text style={styles.episodetitle}>
                    {/* Alfred Coffee 2 Go */}
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../assets/location.png')} style={{ height: 15, width: 10, marginRight: 5 }} />
                    <Text style={styles.address}>
                      {item.address.address}
                      {/* 8509 Meltrose Ave, West Hollywood, CA 90069 */}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 0 }}>
                    <Image source={require('../../assets/miles.png')} style={{ height: 12, width: 12, marginRight: 5, marginTop: 3 }} />
                    <Text style={styles.miles}>
                      {/* 2 miles */}
                      {/* {item.distance} miles */}
                      {/* {this.getDistance(item.address.coordinates[0],item.address.coordinates[1])} */}
                      {/* {this.state.distance} */}
                      {item.distance} miles
                      
                    </Text>
                  </View>
                  {/* {this.renderdistance()} */}
                </View>
              </TouchableWithoutFeedback>
            </View>
        </View>
      )
    })
   
  }

  renderdistance =() => {
    return this.state.distances.map((distance) => {
      return (
        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                    <Image source={require('../../assets/miles.png')} style={{ height: 12, width: 12, marginRight: 5, marginTop: 3 }} />
                    <Text style={styles.miles}>
                      {/* 2 miles */}
                      {/* {item.distance} miles */}
                      {/* {this.getDistance(item.address.coordinates[0],item.address.coordinates[1])} */}
                      {/* {this.state.distance} */}
                      {distance} miles
                      
                    </Text>
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
        <View style={{ marginTop:Platform.OS==='android'? 15:30, marginLeft: 10, flexDirection: 'row' }}>
          <TouchableWithoutFeedback
          // onPress={() => this.props.navigation.navigate('Episodes')}
          >
            <Ionicons name="chevron-back-outline" size={40} />
          </TouchableWithoutFeedback>

          <Text style={styles.heading}>
            Restaurants
          </Text>
        </View>

        <ScrollView>
          <View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15, }}>
              <View style={styles.container}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={async(text) => await this.setState({searchvalue:text}, () =>this.searchwithstring())}
                  value={this.state.searchvalue}
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
                  <Text style={{ color: '#282828', fontSize: 14,  }}>
                    Filter
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
                {this.state.seachresults?
                <ScrollView>
                  {this.createsearch()}
                </ScrollView>  
                :
                null
              }

            <View>
              {this.state.showloader?
              this.renderrestaurants()
              :
              <View style={{justifyContent:'center',alignItems:'center', height:Dimensions.get('window').height/2,width:Dimensions.get('window').width}}>
                  <ActivityIndicator size="large" color="#2e3191" />
              </View>
              }
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Restaurantdetail')}
              >
                <View style={styles.restaurantview}>
                  <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Restaurantdetail')}
              >
                <View style={{ width: Dimensions.get('window').width - 100, height: 75 }}>
                  <Text style={styles.episodetitle}>
                    Alfred Coffee 2 Go
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../assets/location.png')} style={{ height: 15, width: 10, marginRight: 5 }} />
                    <Text style={styles.address}>
                      8509 Meltrose Ave, West Hollywood, CA 90069
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Image source={require('../../assets/miles.png')} style={{ height: 12, width: 12, marginRight: 5, marginTop: 3 }} />
                    <Text style={styles.miles}>
                      2 miles
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View> */}
          </View>

          {/* <Text>
              Latitude: {this.state.currentLatitude}
            </Text>
            <Text>
              Longitude: {this.state.currentLongitude}
            </Text> */}

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

  episodetitle: {
    fontSize: 16,
    fontWeight: '500',
    //fontFamily: 'Poppins',
    lineHeight: 24,
    color: '#646CE9',
  },
  miles: {
    fontSize: 12,
    fontWeight: '400',
   // fontFamily: 'Poppins',
    lineHeight: 18,
    color: '#282828',

  },
  address: {
    fontSize: 12,
    fontWeight: '400',
   // fontFamily: 'Poppins',
    lineHeight: 15,
    color: '#282828',
    flex: 1,
  },
  restaurantview: {
    height: 75,
    width: 75,
    borderRadius: 10,
    marginTop: 0,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.09)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  restauranttitle: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 21,
    //fontFamily: 'Poppins',
    marginTop: 10
  },
  restaurantimage: {
    height: 70,
    width: 70,
    borderRadius: 10,
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

});

