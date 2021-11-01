import React, { useEffect } from 'react';
//import { AsyncStorage } from 'react-native';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../api';
//import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',

        }
    }

    login =() => {
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "username":this.state.email,
    "password":this.state.password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(BASE_URL+"users/login", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      if(result.success == true) {
          AsyncStorage.setItem('userid',result.data._id)
          AsyncStorage.setItem('token',result.data.token)
          this.props.navigation.navigate('Discover')
      }
      else if(result.success == false){
         
        alert(result.errors)
      }
      else if(result.statusCode == 400){
          alert(result.error)
      }
    })
  .catch(error => console.log('error', error));
    }


    componentDidMount() {
        //console.log('splash')

    }

    render() {
        const { navigation } = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    //alignItems: 'center',

                }}
            >
                <ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 30,marginRight:30,marginBottom:30,marginTop:Platform.OS === 'android'?30:40}}>
                    <Image source={require('../../assets/1.png')} style={{ height: 90, width: Dimensions.get('window').width / 3 }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 17, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Password'
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 20, }}>
                    <TouchableOpacity
                    onPress={() =>this.props.navigation.navigate('Forgotpw')}
                    >
                        <Text>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems:'center',justifyContent:'center', marginTop:Dimensions.get('window').height/20}}>
                <TouchableOpacity
                onPress={() =>this.login()}
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
                            style={{color:'#ffffff', fontWeight:'500'}}
                            >
                                Sign In
                            </Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>

                </View>

                <View style={{alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/20}}>
                    <Text>
                        ---------- Or Sign In Using ----------
                    </Text>
                </View>

                <View style={{justifyContent:'center',margin:40}}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity>
                        <Image source={require('../../assets/facebook.png')} style={styles.imagesocialicons} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Image source={require('../../assets/Twitter.png')} style={styles.imagesocialicons} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Image source={require('../../assets/google.png')} style={styles.imagesocialicons} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Image source={require('../../assets/apple.png')} style={styles.imagesocialicons} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',}}>
                    <Text
                    // fontFamily:'Poppins',
                    style={{fontSize:16,fontWeight:'600'}}
                    >
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                    onPress={() =>this.props.navigation.navigate('Join')}
                    >
                        <Text
                        // fontFamily:'Poppins',
                        style={{color:'#646CE9',fontSize:16,fontWeight:'600'}}
                        >
                            Join Now
                        </Text>
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
    }


});