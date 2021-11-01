import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView,Modal } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-elements'
import { BASE_URL } from '../api';
var ImagePicker = require('react-native-image-picker');
import * as RNLocalize from 'react-native-localize';

export default class Editprofile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname:'',
            lastname:'',
            email: '',
            dob: '',
            city_state:'',
            timezone:'',
            checked:true,
            photo:'',
            profileUri:'',
            cameraClicked:false,
            oldpw:'',
            newpw:'',
            confirmpw:'',
            showmodal:false,
        
        }
    }




    componentDidMount() {
        //console.log('splash')
        let tz = RNLocalize.getTimeZone();
        this.setState({timezone:tz})
        console.log('timezone',RNLocalize.getTimeZone());
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

      editprofile = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "firstname":this.state.firstname,
            "lastname":this.state.lastname,
            "dob":this.state.dob,
            "timezone":this.state.timezone,
            "address":{"state":this.state.city_state}
        });
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(BASE_URL+"users/profile", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              if(result.statusCode == 401){
                  alert(result.error)
              }
              else {
                  alert(result.message)
              }
            })
          .catch(error => console.log('error', error));
      }

      changepassword =() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "oldPassword":this.state.oldpw,
            "newPassword":this.state.newpw,
            "confirmPassword":this.state.confirmpw
        });
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(BASE_URL+"users/change-password", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              if(result.statusCode == 200){
                  alert(result.message)
              }
              else if(result.statusCode == 401){
                alert(result.message)
              }
              else {
                alert(result.message)
              }
            })
          .catch(error => console.log('error', error));
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

                <View style={{alignItems:'center',marginBottom:20,marginTop:Platform.OS==='android'?20:20}}>
                    <View style={{flexDirection:'row',}}>
                    <View style={{width:100,height:100,borderRadius:50,backgroundColor:'#D6D6D6',alignItems:'center',justifyContent:'center',marginTop:30}}>
                   
                    {this.state.cameraClicked ?
                                    <Image
                                        source={{ uri: this.state.profileUri }}
                                        style={{ height: 90, width: 90,borderRadius:45 }}
                                    />
                                    :
                                    <Image source={require('../../assets/user-plain.png')} style={{ height: 55, width: 45 }} />
                            }
                   
                    
                    </View>
                    
                    <View style={{top:30,left:70,position:'absolute'}}>
                    <TouchableOpacity 
                    onPress={() =>this.launchCamera()}
                    >
                    <Image source={require('../../assets/cam.png')} style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                    </View>
                    
                
                </View>
                </View>


                <View style={{alignItems:'center',justifyContent:'center', marginTop:10,marginBottom:20}}>
                <TouchableOpacity
                onPress={() =>this.setState({showmodal:!this.state.showmodal})}
               // onPress={() =>this.changepassword()}
                //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                >
                    <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                        colors={['#3662DB','#9C33CB']}
                        style={{ height: 40, width: Dimensions.get('window').width/2, borderRadius: 8,alignItems:'center',justifyContent:'center'  }} 
                    >
                        {/* fontFamily:'Poppins', */}
                            <Text
                            style={{color:'#ffffff', fontWeight:'500',fontSize:12}}
                            >
                                Change Password
                            </Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                {this.state.showmodal?
                <View>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showmodal}
                    >
                        <View style={styles.btnParentSection}>
                        <View
                style={{
                  borderRadius: 5,
                  borderWidth: 0.5,
                  backgroundColor: '#FFFFFF',
                  width: Dimensions.get('window').width,
                }}>
                    <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 17, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Old Password'
                        onChangeText={(text) => this.setState({ oldpw: text })}
                        value={this.state.oldpw}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 17, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='New Password'
                        onChangeText={(text) => this.setState({ newpw: text })}
                        value={this.state.newpw}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 17, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Confirm Password'
                        onChangeText={(text) => this.setState({ confirmpw: text })}
                        value={this.state.confirmpw}
                    />
                </View>

                <View style={{alignItems:'center',justifyContent:'center', marginTop:10,marginBottom:20}}>
                <TouchableOpacity
                onPress={() =>this.changepassword()}
               // onPress={() =>this.changepassword()}
                //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                >
                    <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                        colors={['#3662DB','#9C33CB']}
                        style={{ height: 40, width: Dimensions.get('window').width/2, borderRadius: 8,alignItems:'center',justifyContent:'center'  }} 
                    >
                        {/* fontFamily:'Poppins', */}
                            <Text
                            style={{color:'#ffffff', fontWeight:'500',fontSize:12}}
                            >
                                Submit
                            </Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                </View>
                </View>
                    </Modal>
                </View>
            :null
            }

                <View style={{flexDirection:'row',marginLeft:15}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/user.png')} style={{height:20,width:15,margin:9.5}} />
                    </View>
                    <TextInput
                        style={styles.nameinput}
                        placeholder='First Name'
                        onChangeText={(text) => this.setState({ firstname: text })}
                        value={this.state.firstname}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/user.png')} style={{height:20,width:15,margin:9.5}} />
                    </View>
                    <TextInput
                        style={styles.nameinput}
                        placeholder='Last Name'
                        onChangeText={(text) => this.setState({ lastname: text })}
                        value={this.state.lastname}
                    />
                </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop: Dimensions.get('window').height / 20, }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/3.png')} style={styles.imageemail} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Email Address'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 20, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Date of Birth 2021-03-27'
                        onChangeText={(text) => this.setState({ dob: text })}
                        value={this.state.dob}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 20, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='City / State'
                        onChangeText={(text) => this.setState({ city_state: text })}
                        value={this.state.city_state}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 20, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Time Zone'
                        onChangeText={(text) => this.setState({ timezone: text })}
                        value={this.state.timezone}
                    />
                </View>


                <View style={{alignItems:'center',justifyContent:'center', marginTop:Dimensions.get('window').height/20,marginBottom:20}}>
                <TouchableOpacity
                onPress={() =>this.props.navigation.navigate('Discover')}
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
                                Save
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
    textinput: {
        width: Dimensions.get('window').width - 80,
        height: 40,
        borderBottomWidth: 1,
        fontSize: 16,
    },
    imagekey: {
        height: 20,
        width: 20,
        margin: 9.5,
    },
    imageemail: {
        height: 15,
        width: 20,
        margin: 12,
    },
    imagesocialicons:{
        height:40,
        width:40,
        marginRight:20,
    },
    nameinput:{
        width: Dimensions.get('window').width/2-60,
        height: 40,
        borderBottomWidth: 1,
        fontSize: 16,
        marginRight:18
    },
    agreeinput:{
       // fontFamily:'Poppins',
        fontSize:14,
        color:'#A8A8A8',
        //flexWrap:'wrap',
        //lineHeight:22,
        marginLeft:-15,
        marginTop:15
    },
    termsinput:{
        color:'#3662DB',
       // fontFamily:'Poppins',
        fontSize:14,
        
    },
    btnParentSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },


});