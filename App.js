/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { MainStackNavigator } from "./src/navigation/stackNavigator";

// const App = () => {
//   return (
//     <NavigationContainer>
//       <MainStackNavigator />
//       {/* <BottomTabNavigator /> */}
//     </NavigationContainer>
//   );
// }
// export default App

import React from "react";
import { View, StyleSheet, Image, Text, Platform, Dimensions, TextInput, TouchableOpacity,Button, ScrollView, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator,BottomTabBar } from '@react-navigation/bottom-tabs';
import Splash from "./src/Screens/splash"
import Login from "./src/Screens/login";
import Join from "./src/Screens/join";
import Editprofile from "./src/Screens/editprofile";
import Forgotpw from "./src/Screens/forgotpw";
import Episodes from "./src/Screens/episodes";
import Episodedetail from "./src/Screens/episodedetail";
import Restaurants from "./src/Screens/restaurants";
import Badges from "./src/Screens/badges";
import Restaurantdetail from "./src/Screens/restaurantdetail";
import Discover from "./src/Screens/discover";
import Feed from "./src/Screens/feed";
import Sidemenu from "./src/Screens/sidemenu";
import Profile from "./src/Screens/profile";
import Checkinlist from "./src/Screens/checkinlist";
import Checkinsharelist from "./src/Screens/checkinsharelist";
import Bloglist from "./src/Screens/bloglist";
import Blogdetailimage from "./src/Screens/blogdetailimage";
import Blogdetailvideo from "./src/Screens/blogdetailvideo";
import Recipes from "./src/Screens/recipes";
import Recipesdetail from "./src/Screens/recipesdetail";
import Policy from "./src/Screens/policy";
import Post from "./src/Screens/post";
import Settings from "./src/Screens/settings";
import Leaderboard from "./src/Screens/leaderboard";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();



function MyTabs() {
    return (
      
        <Tab.Navigator 
        tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,6)}}></BottomTabBar>}
        >
          <Tab.Screen 
           name="Discover" 
           component={Discover} 
           options={{ 
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:40,width:40}}
                source={require('./assets/discover.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Discover',
           tabBarOptions: { activeTintColor:'#9C33CB'}             
          }}
           />
           <Tab.Screen 
           name="Feed" 
           component={Feed} 
           options={{
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:30,width:30,marginTop:5}}
                source={require('./assets/newsfeed1.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Feeds',
           tabBarOptions: { activeTintColor:'#9C33CB'}               
          }}
           />
           <Tab.Screen 
           name="Restaurants" 
           component={Restaurants} 
           options={({route}) => ({
            tabBarIcon: ({ color }) => (
             <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:25,width:25,marginTop:5}}
                source={require('./assets/restau.png')}                 
                />
               </View>
           ), 
           tabBarLabel: 'Restaurants',
           tabBarOptions: { activeTintColor:'#9C33CB'}               
          })}
           />
          
           <Tab.Screen 
           name="Episodes" 
           component={Episodes} 
           options={{
            tabBarIcon: ({ color }) => (
              <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:10,width:10}}
                source={require('./assets/monitor.png')}                 
                />
                </View>
           ), 
           tabBarLabel: 'Episodes',
           tabBarOptions: { activeTintColor:'#9C33CB'}               
          }}
           />
           <Tab.Screen 
           name="Profile" 
           component={Profile} 
           options={{
            tabBarIcon: ({ color }) => (
              <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:10}}
                source={require('./assets/user.png')}                 
                />
                </View>
           ), 
           tabBarLabel: 'Profile',
           tabBarOptions: { activeTintColor:'#9C33CB'}               
          }}
           />
            <Tab.Screen 
            name="Sidemenu" 
            component={Sidemenu} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'More',
             tabBarVisible: false,
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
             <Tab.Screen 
            name="Restaurantdetail" 
            component={Restaurantdetail} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Restaurantdetail',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
             <Tab.Screen 
            name="Episodedetail" 
            component={Episodedetail} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Episodedetail',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Checkinlist" 
            component={Checkinlist} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Checkinlist',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Checkinsharelist" 
            component={Checkinsharelist} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Checkinsharelist',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Bloglist" 
            component={Bloglist} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Bloglist',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Blogdetailimage" 
            component={Blogdetailimage} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Blogdetailimage',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Blogdetailvideo" 
            component={Blogdetailvideo} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Blogdetailvideo',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Recipes" 
            component={Recipes} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Recipes',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Recipesdetail" 
            component={Recipesdetail} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Recipesdetail',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Policy" 
            component={Policy} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Policy',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
            <Tab.Screen 
            name="Leaderboard" 
            component={Leaderboard} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#DDDDDD',alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height:12,width:15}}
                source={require('./assets/more.png')}                 
                />
                </View>
             ), 
             tabBarLabel: 'Leaderboard',
             tabBarOptions: { activeTintColor:'#9C33CB'}               
            }}
            />
        </Tab.Navigator>
        
    );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
      <Stack.Screen name="Episodes" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Episodedetail" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
       <Stack.Screen name="Restaurants" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Badges" component={Badges} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Restaurantdetail" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: true,}}
      />
      <Stack.Screen name="Discover" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Feed" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Sidemenu" component={MyTabs} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
       <Stack.Screen name="Profile" component={MyTabs} 
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
    </NavigationContainer>

);
}

// export ;