import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
var ImagePicker = require('react-native-image-picker');

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo:'',
            profileUri:'',
            cameraClicked:false,
        }
    }




    componentDidMount() {
        //console.log('splash')

    }

    launchCamera = async () => {
        //this.setState({ modalVisible: false,})
         let options = {
           storageOptions: {
             skipBackup: true,
             path: 'images',
           },
         };
     
         // const granted = await PermissionsAndroid.request(
         //   PermissionsAndroid.PERMISSIONS.CAMERA,
         //   {
         //     title: 'App Camera Permission',
         //     message: 'App needs access to your camera ',
         //     // buttonNeutral: "Ask Me Later",
         //     // buttonNegative: "Cancel",
         //     // buttonPositive: "OK"
         //   },
         // );
     
         // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           ImagePicker.launchCamera(options, (response) => {
             console.log('Response = ', response);
     
             if (response.didCancel) {
               console.log('User cancelled image picker');
             } else if (response.error) {
               console.log('ImagePicker Error: ', response.error);
             } else if (response.customButton) {
               console.log('User tapped custom button: ', response.customButton);
               alert(response.customButton);
             } else {
              // const source = { uri: response.uri };
               console.log('photo', JSON.stringify(response));
     
               this.setState({
                  profileimage: response,
                 // filePath: response,
                 // fileData: response.data,
                 profileUri: response.assets[0].uri,
                 type: response.assets[0].type,
                 cameraClicked: true,
                // modalVisible: false,
               });
 
               console.log('photo uri',this.state.profileUri)
     
             }
           });
         //}
     
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

                <View style={{margin:10,flexDirection:'row',marginTop:Platform.OS =='android'? 20:40}}>
                    <TouchableOpacity
                    onPress={() =>this.props.navigation.navigate('Login')}
                    >
                    <Ionicons name="chevron-back-outline" size={40}  />
                    </TouchableOpacity>
                    <View>
                    {/* fontFamily:'Poppins', */}
                        <Text style={{fontWeight:'bold',fontSize:20,color:'#646CE9',marginTop:5}}>
                            Check In
                        </Text>
                    </View>
                </View>

                <View style={styles.profileview}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.profileimageview}>
                                {this.state.cameraClicked?
                                <Image
                                source={{ uri: this.state.profileUri }}
                                style={styles.profileimage}
                            />
                            :
                            <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />

                                }
                            </View>
                            <View>
                                <Text style={styles.restaurantname}>
                                Alfred Coffee 2 Go
                                </Text>
                                <Text style={styles.location}>
                                California, United States
                                </Text>
                            </View>
                        </View>
                        <View>
                        <TouchableWithoutFeedback
                        onPress={() =>this.launchCamera()}
                        >
                        <LinearGradient
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                //useAngle={true}
                                //angle={180}
                                colors={[ '#3662DB','#9C33CB']}
                                style={{ height: 44, width:44, borderRadius:22,alignItems:'center',justifyContent:'center'}}
                            >
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#ffffff',fontSize:18}}>
                                    +
                                </Text>
                                <Ionicons name="camera" size={15} color={'#ffffff'} style={{marginTop:5}}/>
                            </View>
                        </LinearGradient>
                        </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>

                <View elevation={5} style={styles.message}>
                    <TextInput 
                    placeholder="share your thoughts about Restaurant..."
                    multiline={true}
                    style={{paddingLeft:15,paddingTop:10}}
                    />
                </View>

                <View style={{margin:15}}>
                    <Text style={styles.whatyoueattext}>
                        What did you eat?
                    </Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <ScrollView horizontal={true}>
                    <View style={styles.dishview}>
                        <Text style={styles.dishtitle}>
                            Sandwhich
                        </Text>
                    </View>
                    <View style={styles.dishview}>
                        <Text style={styles.dishtitle}>
                            Cold Coffee
                        </Text>
                    </View>
                    <View style={styles.dishview}>
                        <Text style={styles.dishtitle}>
                            Cappuccino
                        </Text>
                    </View>
                    <View style={styles.dishview}>
                        <Text style={styles.dishtitle}>
                            Sandwhich
                        </Text>
                    </View>
                    <View style={styles.dishview}>
                        <Text style={styles.dishtitle}>
                            Sandwhich
                        </Text>
                    </View>

                </ScrollView>
                </View>

                <View style={{alignItems:'center',justifyContent:'center', marginTop:Dimensions.get('window').height/8}}>
                <TouchableOpacity
                //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                >
                    <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                        colors={['#3662DB','#9C33CB']}
                        style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,alignItems:'center',justifyContent:'center'  }} 
                    >
                        {/* fontFamily:'Poppins', */}
                            <Text
                            style={{color:'#ffffff', fontWeight:'500',fontSize:22}}
                            >
                                Check In
                            </Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>

                </View>
                
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileview:{
        height:50,
        width:Dimensions.get('window').width-30,
        marginLeft:15,
        marginRight:15,
       // alignItems:'center',
       // justifyContent:'space-between',
    },
    profileimageview:{
        height:44,
        width:44,
        borderRadius:22,
        marginRight:5,
    },
    profileimage:{
        height:42,
        width:42,
        borderRadius:21,
    },
    restaurantname:{
      //  fontFamily:'Poppins',
        fontSize:14,
        lineHeight:21,
        color:'#646CE9',
    },
    location:{
      //  fontFamily:'Poppins',
        fontSize:10,
        lineHeight:15,
        color:'#282828',
    },
    message:{
        height:Dimensions.get('window').height/3,
        width:Dimensions.get('window').width-30,
        marginLeft:15,
        marginRight:15,
        borderRadius:10,
        marginTop:10,
    },
    whatyoueattext:{
       // fontFamily:'Poppins',
        fontSize:16,
        lineHeight:24,
        color:'#9973BE', 
    },
    dishview: {
        alignSelf: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        //borderWidth: 1,
        //borderColor: '#646CE9',
        borderRadius: 10,
        marginLeft: 10,
        marginBottom: 5,
        backgroundColor:'#EEEFFA'
    },
    dishtitle: {
      //  fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        color: '#A8A8A8',
    },

    
    


});