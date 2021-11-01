import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-elements'
import { BASE_URL } from '../api';

export default class Join extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname:'',
            lastname:'',
            email: '',
            password: '',
            confirmpassword:'',
            checked:true,

        }
    }




    componentDidMount() {
        //console.log('splash')
    }

    signup =() => {
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "firstName":this.state.firstname,
    "lastName":this.state.lastname,
    "email":this.state.email,
    "password":this.state.password,
    "action":this.state.confirmpassword
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(BASE_URL+"users/register", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      if(result.success == true){
          alert(result.message)
          this.props.navigation.navigate('Login')
      }
      else{
          alert(result.errors)
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
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20,marginRight:20,marginBottom:20,marginTop:Platform.OS === 'android'?20:35 }}>
                    <Image source={require('../../assets/1.png')} style={{ height: 70, width: 100 }} />
                </View>

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
                        placeholder='Password'
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height / 20, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                        <Image source={require('../../assets/key.png')} style={styles.imagekey} />
                    </View>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Confirm Password'
                        onChangeText={(text) => this.setState({ confirmpassword: text })}
                        value={this.state.confirmpassword}
                    />
                </View>

                <View style={{alignItems:'center'}}>
                
                    <View style={{flexDirection:'row'}}>
                    <CheckBox
                    checkedColor={'#3662DB'}
                    size={20}
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                    />
                    
                    <Text style={styles.agreeinput}>
                        By joing you agree to Triple D Life's 
                    </Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:-10,marginLeft:20}}>
                    <TouchableOpacity style={{}}>
                            <Text style={styles.termsinput}>
                                Terms of Use
                            </Text>
                        </TouchableOpacity>
                        {/* fontFamily:'Poppins', */}
                        <Text style={{fontSize:14,color:'#A8A8A8'}}> and </Text>

                        <TouchableOpacity >
                            <Text style={styles.termsinput}>
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                


                <View style={{alignItems:'center',justifyContent:'center', marginTop:Dimensions.get('window').height/20}}>
                <TouchableOpacity
                onPress={() =>this.signup()}
                //onPress={() =>this.props.navigation.navigate('Login')}
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
                                Join
                            </Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>

                </View>

                <View style={{alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/20}}>
                    <Text>
                        ---------- Or Join Using ----------
                    </Text>
                </View>

                <View style={{justifyContent:'center',margin:40,marginBottom:0}}>
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

                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/30,marginBottom:20}}>
                    <Text
                    // fontFamily:'Poppins',
                    style={{fontSize:16,fontWeight:'600'}}
                    >
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity
                    onPress={() =>this.props.navigation.navigate('Login')}
                    >
                        <Text
                        // fontFamily:'Poppins',
                        style={{color:'#646CE9',fontSize:16,fontWeight:'600'}}
                        >
                            Sign In
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