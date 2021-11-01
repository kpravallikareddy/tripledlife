import React from "react";
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView, ImageBackground } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from "../Screens/splash";
import Login from "../Screens/login";
import Join from "../Screens/join";
import Editprofile from "../Screens/editprofile";
import Forgotpw from "../Screens/forgotpw";
import Episodes from "../Screens/episodes";
import Episodedetail from "../Screens/episodedetail";
import Restaurants from "../Screens/restaurants";
import Badges from "../Screens/badges";
import Restaurantdetail from "../Screens/restaurantdetail";
import Discover from "../Screens/discover";
import Feed from "../Screens/feed";
import Sidemenu from "../Screens/sidemenu";
import Profile from "../Screens/profile";
import Checkinlist from "../Screens/checkinlist";
import Checkinsharelist from "../Screens/checkinsharelist";
import Bloglist from "../Screens/bloglist";
import Blogdetailimage from "../Screens/blogdetailimage";
import Blogdetailvideo from "../Screens/blogdetailvideo";
import Recipes from "../Screens/recipes";
import Recipesdetail from "../Screens/recipesdetail";
import Policy from "../Screens/policy";
import Post from "../Screens/post";
import Settings from "../Screens/settings";
import Leaderboard from "../Screens/leaderboard";


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Discover">
          <Tab.Screen 
           name="Discover" 
           component={MainStackNavigator} 
           options={{
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD'}}>
              <Image
                style={{height:10,width:10}}
                source={require('../../assets/discover.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Discover'             
          }}
           />
           <Tab.Screen 
           name="Feed" 
           component={MainStackNavigator} 
           options={{
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD'}}>
              <Image
                style={{height:10,width:10}}
                source={require('../../assets/newsfeed1.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Feeds'             
          }}
           />
           <Tab.Screen 
           name="Restaurants" 
           component={MainStackNavigator} 
           options={{
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD'}}>
              <Image
                style={{height:10,width:10}}
                source={require('../../assets/restau.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Restaurants'             
          }}
           />
           <Tab.Screen 
           name="Episodes" 
           component={MainStackNavigator} 
           options={{
            tabBarIcon: ({ color }) => (
              <ImageBackground 
              source={require('../../assets/mon.png')}                 
              style={{width:40,height:40,alignItems:'center',justifyContent:'center'}}
              >
              <Image
                style={{height:10,width:10}}
                source={require('../../assets/monitor-plain.png')}                 
                />
                </ImageBackground>
           ), 
           tabBarLabel: 'Episodes'             
          }}
           />
           <Tab.Screen 
           name="Profile" 
           component={MainStackNavigator} 
           options={{
            tabBarIcon: ({ color }) => (
              <ImageBackground 
              source={require('../../assets/mon.png')}                 
              style={{width:40,height:40,alignItems:'center',justifyContent:'center'}}
              >
              <Image
                style={{height:10,width:10}}
                source={require('../../assets/user.png')}                 
                />
                </ImageBackground>
           ), 
           tabBarLabel: 'Profile'             
          }}
           />
            <Tab.Screen 
            name="Sidemenu" 
            component={MainStackNavigator} 
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  style={{height:20,window:20}}
                  source={require('../../assets/user.png')}                 
                  />
             ), 
             tabBarLabel: 'More'             
            }}
            />
            {/* <Tab.Screen 
           name="Discover" 
           component={Episodes} 
           options={{
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD'}}>
              <Image
                style={{height:10,width:10}}
                source={require('../../assets/discover.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Discover'             
          }}
           /> */}
           
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator 
    initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Login" component={Login} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Join" component={Join} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Editprofile" component={Editprofile} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Forgotpw" component={Forgotpw} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Episodes" component={Episodes} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Episodedetail" component={Episodedetail} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
       <Stack.Screen name="Restaurants" component={Restaurants} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Badges" component={Badges} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Restaurantdetail" component={Restaurantdetail} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Discover" component={Discover} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Feed" component={Feed} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Sidemenu" component={Sidemenu} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
       <Stack.Screen name="Profile" component={Profile} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Checkinlist" component={Checkinlist} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Checkinsharelist" component={Checkinsharelist} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Bloglist" component={Bloglist} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Blogdetailimage" component={Blogdetailimage} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Blogdetailvideo" component={Blogdetailvideo} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Recipes" component={Recipes} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Recipesdetail" component={Recipesdetail} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Policy" component={Policy} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Post" component={Post} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Settings" component={Settings} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Leaderboard" component={Leaderboard} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      
      {/* <Stack.Screen name="Tabs" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      /> */}
    </Stack.Navigator>

);
}

export { MainStackNavigator };