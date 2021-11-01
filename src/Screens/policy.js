import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Policy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
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
                            Privacy Policy
                        </Text>
                    </View>
                </View>

                <View style={{marginLeft:15,marginRight:15}}>
                    <Text style={styles.headingtext}>
                    There are many variations of passages of Lorem Ipsum available, but the majorit:
                    </Text>
                    <View>
                    <Text style={styles.paragraphtext}>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                    </Text>
                    </View>
                    <View style={{marginTop:-5}}>
                    <Text style={styles.paragraphtext}>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                    </Text>
                    </View>
                </View>
                

                

                
                
           
                
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headingtext:{
       // fontFamily:'Poppins',
        fontSize:14,
        lineHeight:21,
        color:'#282828',
        marginBottom:10
    },
    paragraphtext:{
       // fontFamily:'Poppins',
        fontSize:12,
        lineHeight:18,
        color:'#282828'
    }
    
    


});