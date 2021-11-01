import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toggle from 'react-native-toggle-element';

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            togglevalueappnotification:true,
            togglevalueemailnotification:false,
            togglevaluelanguagenotification:true,
            togglevaluethemenotification:false,
        }
    }




    componentDidMount() {
        //console.log('splash')

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
                           Settings
                        </Text>
                    </View>
                </View>

                <View style={{marginLeft:15,marginRight:15}}>
                    <Text style={styles.title}>
                        Notifications
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                        <Text style={styles.subtitle}>
                            App Notifications
                        </Text>
                        <View>
                        <Toggle 
                        value={this.state.togglevalueappnotification} 
                        onPress={(val) => this.setState({togglevalue:val})} 
                        trackBar={{
                            width: 30,
                            height: 15,
                            radius: 15,
                            activeBackgroundColor:'#DEDEDE',
                            inActiveBackgroundColor:'#DEDEDE'
                          }}
                          thumbButton={{
                            width: 14,
                            height: 14,
                            radius: 7,
                            activeBackgroundColor:'#646CE9',
                            inActiveBackgroundColor:'#ABABAB'
                          }}

                        />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                        <Text style={styles.subtitle}>
                            Email Notifications
                        </Text>
                        <View>
                        <Toggle 
                        value={this.state.togglevalueemailnotification} 
                        onPress={(val) => this.setState({togglevalue:val})} 
                        trackBar={{
                            width: 30,
                            height: 15,
                            radius: 15,
                            activeBackgroundColor:'#DEDEDE',
                            inActiveBackgroundColor:'#DEDEDE'
                          }}
                          thumbButton={{
                            width: 14,
                            height: 14,
                            radius: 7,
                            activeBackgroundColor:'#646CE9',
                            inActiveBackgroundColor:'#ABABAB'
                          }}

                        />
                        </View>
                        </View>
                    
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                        <Text style={styles.title}>
                            Language
                        </Text>
                        <View>
                        <Toggle 
                        value={this.state.togglevaluelanguagenotification} 
                        onPress={(val) => this.setState({togglevalue:val})} 
                        trackBar={{
                            width: 30,
                            height: 15,
                            radius: 15,
                            activeBackgroundColor:'#DEDEDE',
                            inActiveBackgroundColor:'#DEDEDE'
                          }}
                          thumbButton={{
                            width: 14,
                            height: 14,
                            radius: 7,
                            activeBackgroundColor:'#646CE9',
                            inActiveBackgroundColor:'#ABABAB'
                          }}

                        />
                        </View>
                        </View>
                    
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:5}}>
                        <Text style={styles.title}>
                            Theme
                        </Text>
                        <View>
                        <Toggle 
                        value={this.state.togglevaluethemenotification} 
                        onPress={(val) => this.setState({togglevalue:val})} 
                        trackBar={{
                            width: 30,
                            height: 15,
                            radius: 15,
                            activeBackgroundColor:'#DEDEDE',
                            inActiveBackgroundColor:'#DEDEDE'
                          }}
                          thumbButton={{
                            width: 14,
                            height: 14,
                            radius: 7,
                            activeBackgroundColor:'#646CE9',
                            inActiveBackgroundColor:'#ABABAB'
                          }}

                        />
                        </View>
                        </View>


                </View>
                

                

                
                
           
                
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
       // fontFamily:'Poppins',
        fontSize:16,
        lineHeight:24,
        color:'#9973BE',
        marginBottom:10
    },
    subtitle:{
       // fontFamily:'Poppins',
        fontSize:14,
        lineHeight:21,
        color:'#282828'
    }
    
    


});