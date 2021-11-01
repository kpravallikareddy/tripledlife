import React, { useEffect } from 'react';
import {View,StyleSheet, Image,Text,Platform,Dimensions} from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import { Thumbnail } from 'react-native-thumbnail-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default class Badges extends React.Component {
    constructor(props){
        super(props)
        this.state={
         margintop:0,
           
        }
    }

    



    componentDidMount(){
        
    }

    

    render() {
        return (
            <View
            style={{ flex: 1,
            backgroundColor:'#ffffff'
            }}
            >
            <View style={{ marginTop: Platform.OS =='android'? 15:35, marginLeft: 10, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Episodes')}
                    >
                        <Ionicons name="chevron-back-outline" size={40} />
                    </TouchableWithoutFeedback>

                    <Text style={styles.heading}>
                        Badges
                </Text>
                </View>
            <ScrollView>

                <View style={{marginLeft:15}}>
                    <Text style={styles.badgesearned}>
                        Badges Earned
                    </Text>
                </View>

                <View style={{height:120,width:Dimensions.get('window').width, }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:15,marginRight:15,marginTop:15,marginBottom:10}}>
                <View style={styles.badgesunloacked}>
                <View>
                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                <View style={styles.badgeearnedbackgnd}>
                    <Text style={styles.badgeearnedvalue}>
                        x2
                    </Text>
                </View>
                </View>
                <View>
                    <Text style={styles.badgename}>
                        Cheers To You
                    </Text>
                </View>
                </View>

              <View style={styles.badgesunloacked}>
                <View>
                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                <View style={styles.badgeearnedbackgnd}>
                    <Text style={styles.badgeearnedvalue}>
                        x2
                    </Text>
                </View>
                </View>
                <View>
                    <Text style={styles.badgename}>
                        Cheers To You
                    </Text>
                </View>
                </View>

                <View style={styles.badgesunloacked}>
                <View>
                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                <View style={styles.badgeearnedbackgnd}>
                    <Text style={styles.badgeearnedvalue}>
                        x2
                    </Text>
                </View>
                </View>
                <View>
                    <Text style={styles.badgename}>
                        Cheers To You
                    </Text>
                </View>
                </View>

                </View>
                </View>
                
                <View style={{marginTop:15,marginLeft:15,marginBottom:10}}>
                    <Text style={styles.badgesearned}>
                        Unlock Badges 
                    </Text>
                </View>

                <View style={{height:120,width:Dimensions.get('window').width, }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:15,marginRight:15,marginTop:15,marginBottom:10}}>
                
                <View style={styles.badgeslocked}>
                <View style={styles.badgelock}>
                <Fontisto name="locked" size={20} />
                </View>
                <View>
                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                </View>
                <View>
                    <Text style={styles.badgename}>
                        Cheers To You
                    </Text>
                </View>
                </View>

              <View style={styles.badgeslocked}>
              <View style={styles.badgelock}>
                <Fontisto name="locked" size={20} />
                </View>
                <View>
                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                </View>
                <View>
                    <Text style={styles.badgename}>
                        Cheers To You
                    </Text>
                </View>
                </View>

                <View style={styles.badgeslocked}>
                <View style={styles.badgelock}>
                <Fontisto name="locked" size={20} />
                </View>
                <View>
                <Image source={require('../../assets/restaurant.jpeg')} style={styles.restaurantimage} />
                </View>
                <View>
                    <Text style={styles.badgename}>
                        Cheers To You
                    </Text>
                </View>
                </View>

                </View>
                </View>
                



       
            </ScrollView>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize:20,
        fontWeight:'600',
       // fontFamily:'Poppins',
        lineHeight:30,
        color:'#646CE9',
        marginTop:5,
    },

    badgesearned:{
        fontSize:16,
        fontWeight:'600',
       // fontFamily:'Poppins',
        lineHeight:24,
        color:'#9973BE',
    },
    badgesunloacked:{
        width:100,
        height:100,
        borderRadius:10,
        backgroundColor:'#9973BE',
        alignItems:'center',
        justifyContent:'center',
    },
    restaurantimage: {
        height: 40,
        width: 40,
        borderRadius: 20,
      },
   badgename:{
      // fontFamily:'Poppins',
       fontWeight:'500',
       fontStyle:'normal',
       fontSize:10,
       lineHeight:15,
       textAlign:'center',
       color:'#ffffff',
       marginTop:5,
   },
   badgeearnedvalue:{
   // fontFamily:'Poppins',
    fontWeight:'400',
    fontStyle:'normal',
    fontSize:7,
    lineHeight:10,
    textAlign:'center',
    color:'#ffffff',
   },
   badgeearnedbackgnd:{
       position:'absolute',
       width:16,
       height:16,
       backgroundColor:'#646CE9',
       alignItems:'center',
       justifyContent:'center',
       borderRadius:8,
       left:30,
       top:-5,
   },
   badgeslocked:{
    width:100,
    height:100,
    borderRadius:10,
    backgroundColor:'#646CE9',
    alignItems:'center',
    justifyContent:'center',
   },
   badgelock:{
    position:'absolute',
    left:60,
    top:-15,
},
    
    
    
});

