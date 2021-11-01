import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../api';

export default class Sidemenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           listofvideos:[],
           listofaudios:[],
        }
    }




    componentDidMount() {
        //console.log('splash')

        this.getvideos();
        this.getaudios();
    }

    getvideos =() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(BASE_URL+"posts/posts?type=video&limit=4&page=1", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.success == true) {
                    if(result.data.records.length == 0){
                        alert('No data found')
                    }else{
                        for (let i = 0; i < result.data.records.length; i++) {
            
                            this.state.listofvideos.push(result.data.records[i])
                          }
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    getaudios =() =>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(BASE_URL+"posts/posts?type=audio&limit=4&page=1", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.success == true) {
                    if(result.data.records.length == 0){
                        alert('No data found')
                    }else{
                        for (let i = 0; i < result.data.records.length; i++) {
            
                            this.state.listofaudios.push(result.data.records[i])
                          }
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#E5E5E5',
                    //alignItems: 'center',

                }}
            >
                <ScrollView>

                <View style={styles.profileboxview}>
                <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                     useAngle={true}
                     angle={180}
                     colors={['rgba(54,98,219,0.8)','rgba(156,51,203,0.7)']}
                     style={{ height: 200, width: Dimensions.get('window').width,justifyContent:'center',alignItems:'center' }} 
                >
                    <View>
                    <View style={{left:Dimensions.get('window').width/2+10,top:15,position:'absolute'}}>
                        <TouchableWithoutFeedback>
                        <Entypo name="cross" size={25} color={'#ffffff'} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.profileview}>
                    <View style={styles.profileimageview}>
                    <Image source={require('../../assets/restaurant.jpeg')} style={styles.profileimage} />
                    </View>
                    <View>
                        <Text style={styles.profilename}>
                            Caralyn J.
                        </Text>
                        <Text style={styles.address}>
                            Austin, Texas
                        </Text>
                    </View>
                    </View>
                    
                    </View>

                </LinearGradient>
                </View>
                <View style={styles.menuview}>
                    
                        <TouchableWithoutFeedback 
                         onPress={() =>this.props.navigation.navigate('Bloglist')}
                        style={styles.menutouchview}>
                        <Image source={require('../../assets/blog.png')} style={{height:20,width:20, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Blog
                        </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback 
                        // onPress={() =>this.props.navigation.navigate('Episodes')}
                        style={styles.menutouchview}>
                        <Image source={require('../../assets/video.png')} style={{height:20,width:22, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Videos
                        </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback 
                         onPress={() =>this.props.navigation.navigate('Restaurants')}
                        style={styles.menutouchview}>
                        <Image source={require('../../assets/store.png')} style={{height:20,width:20, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Store
                        </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback 
                         onPress={() =>this.props.navigation.navigate('Recipes')}
                        style={styles.menutouchview}>
                        <Image source={require('../../assets/Recipes.png')} style={{height:20,width:20, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Recipes
                        </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={styles.menutouchview}>
                        <Image source={require('../../assets/podcasts.png')} style={{height:18,width:12, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Podcasts
                        </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback 
                        style={styles.menutouchview}
                        onPress={() =>this.props.navigation.navigate('Settings')}
                        >
                        <Image source={require('../../assets/settings.png')} style={{height:20,width:20, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Settings
                        </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={styles.menutouchview}>
                        <Image source={require('../../assets/logout.png')} style={{height:20,width:20, marginRight:10}} />
                        <Text style={styles.menutitle}>
                            Sign out
                        </Text>
                        </TouchableWithoutFeedback>

                   
                </View>
            
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
   
   profileboxview:{
       height:200,
       width:Dimensions.get('window').width,
       
   },
   profileview:{
       height:164,
       width:110,
       alignItems:'center',
       justifyContent:'center'

   },
   profileimageview: {
    height: 60,
width: 60,
borderRadius:30,

},
profileimage: {
    height: 56,
width: 56,
borderRadius: 28,
},
profilename:{
   // fontFamily:'Poppins',
    fontSize:18,
    lineHeight:27,
    fontWeight:'600',
    color:'#ffffff',
},
address:{
   // fontFamily:'Poppins',
    fontSize:12,
    lineHeight:18,
    fontWeight:'normal',
    color:'#ffffff',
},
menuview:{
    //height:Dimensions.get('window').height-210,
    width:Dimensions.get('window').width,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    marginTop:-10,
    backgroundColor:'#ffffff',
    paddingBottom:20,
   // marginBottom:20,
},
menutitle:{
   // fontFamily:'Poppins',
    fontSize:16,
    lineHeight:24,
    fontWeight:'400',
    color:'#282828',
},
menutouchview:{
    flexDirection:'row',
    marginTop:25,
    marginLeft:20,
    alignItems:'center',
   // marginBottom:20
}


});