import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../api';

export default class Forgotpw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
    }

    componentDidMount() {
        //console.log('splash')

    }

    forgotpw =() => {
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "username":this.state.email
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(BASE_URL+"users/forget-password", requestOptions)
  .then(response => {response.json()})
  .then(result => {
        console.log(result)
        if(result.success==true){
            this.props.navigation.navigate('Editprofile')
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

                <View style={{margin:10,flexDirection:'row',marginTop:20}}>
                    <TouchableOpacity
                    onPress={() =>this.props.navigation.navigate('Login')}
                    >
                    <Ionicons name="chevron-back-outline" size={40}  />
                    </TouchableOpacity>
                    <View>
                    {/* fontFamily:'Poppins', */}
                        <Text style={{fontWeight:'bold',fontSize:20,color:'#646CE9',marginTop:5}}>
                            Forgot Password?
                        </Text>
                    </View>
                </View>

                <View style={{width:Dimensions.get('window').width-60,marginLeft:50, alignItems:'center',justifyContent:'center',flexWrap:'wrap',}}>
                {/* fontFamily:'Poppins' */}
                    <Text style={{fontSize:14,lineHeight:21,color:'#282828',}}>
                    Please enter your email address and we
will send you instructions to reset your password.
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop: Dimensions.get('window').height / 13, }}>
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

                   


                <View style={{alignItems:'center',justifyContent:'center', marginTop:Dimensions.get('window').height/8}}>
                <TouchableOpacity
                onPress={() =>this.forgotpw()}
                //style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,backgroundColor:'#9C33CB',alignItems:'center',justifyContent:'center'  }} 
                >
                    <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                        colors={['#3662DB','#9C33CB']}
                        style={{ height: 40, width: Dimensions.get('window').width - 50, borderRadius: 8,alignItems:'center',justifyContent:'center'  }} 
                    >
                            <Text
                            // fontFamily:'Poppins',
                            style={{color:'#ffffff', fontWeight:'500',fontSize:22}}
                            >
                                Send
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
        
    }


});