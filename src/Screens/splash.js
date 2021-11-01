import React, { useEffect } from 'react';
import {View, Image,Text,Platform,Dimensions} from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo';

export default class Splash extends React.Component {
    constructor(props){
        super(props)
        this.state={
         margintop:0,
        }
    }

    setmargintop =() => {
        if(Platform.OS === 'ios') {
            this.setState({margintop:Dimensions.get('window').height-80})
        }
        else if(Platform.OS === 'android') {
            this.setState({margintop:Dimensions.get('window').height-80})
        }
    }


    componentDidMount(){
        //console.log('splash')
        this.setmargintop();
        setTimeout(() => {
            this.props.navigation.navigate('Join')
        }, 2000);
      
    }

    render() {
        return (
            <View
            style={{ flex: 1,
            backgroundColor:'#ffffff'
            }}
            >
                <View style={{marginTop:-50}}>
            <Image source={require('../../assets/2.png')} style={{height:Dimensions.get('window').height/2+200,width:Dimensions.get('window').width,marginTop:-Dimensions.get('window').height/3,marginLeft:0,transform:[{rotateZ:'10deg'}]}}/>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',margin:30}}>
            <Image source={require('../../assets/1.png')} style={{height:70,width:100}}/>
            </View>
            <View>
            <Image source={require('../../assets/2.png')} style={{height:Dimensions.get('window').height/2+210,width:Dimensions.get('window').width,marginLeft:0,transform:[{rotateZ:'5deg'}],}}/>
            </View>
        </View>
        );
    }
}

