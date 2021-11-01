import React, { useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Image, Text, Platform, Dimensions } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Thumbnail } from 'react-native-thumbnail-video';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../api';
import { TouchableOpacity } from 'react-native';

export default class Recipes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            margintop: 0,
            search: '',
            filterDataSource: [],
            masterDataSource: [],
            play: false,
            listofrecipes: [],
            showloader: false,
        }
    }

    searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = this.state.masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            this.setState({ filterDataSource: newData });
            this.setState({ search: text });
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            this.setState({ filterDataSource: this.state.masterDataSource });
            this.setState({ search: text });
        }
    };




    async componentDidMount() {

        await this.getrecipes()

    }

    ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    onStateChange = (state) => {
        if (state === 'ended') {
            this.setState({ playing: false });
            Alert.alert('video has finished playing!');
        }
    }

    getrecipes = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "posts/posts?type=recipe&limit=5", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('recipes', result)
                if (result.success == true) {
                    for (let i = 0; i < result.data.records.length; i++) {

                        this.state.listofrecipes.push(result.data.records[i])
                    }

                    this.setState({ showloader: !this.state.showloader })

                    console.log('image', this.state.listofrecipes[0].image[0])
                }
            })
            .catch(error => console.log('error', error));
    }

    renderrecipes = () => {
        return this.state.listofrecipes.map((item) => {
            return (
                <View style={styles.blogview}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Recipesdetail')}
                    >
                        <View style={styles.imageview}>
                            {/* <Image source={require('../../assets/restaurant.jpeg')} style={styles.image} /> */}
                            <Image source={{ uri: item.image[0] }} style={styles.image} />
                        </View>
                        <View style={{ marginLeft: 15, marginRight: 10, marginTop: 5 }}>
                            <Text style={styles.restauranttitle}>
                                {/* Perfect avacado toast for breakfast */}
                                {item.title}
                            </Text>
                            <Text style={styles.nameandplace}>
                                {item.slug}
                                {/* Sky city Diner, United States */}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View style={{ height: 1, width: Dimensions.get('window').width - 60, backgroundColor: '#E7E7E7', }}>

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, alignItems: 'center' }}>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name="thumbs-up" size={20} color={'#646CE9'} style={{ marginRight: 5 }} />
                                    <Text style={styles.liketext}>
                                        Like({item.likes})
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome name="commenting" size={20} color={'#838383'} style={{ marginRight: 5 }} />
                                    <Text style={styles.liketext}>
                                        Comment({item.totalComments})
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            )
        })
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}
            >
                <View style={{ marginTop: Platform.OS == 'android' ? 15 : 30, marginLeft: 10, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                    // onPress={() => this.props.navigation.navigate('Episodes')}
                    >
                        <Ionicons name="chevron-back-outline" size={40} />
                    </TouchableWithoutFeedback>

                    <Text style={styles.heading}>
                        Recipes
                    </Text>
                </View>

                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15, }}>
                            <View style={{}}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.searchFilterFunction(text)}
                                    value={this.state.search}
                                    //underlineColorAndroid="transparent"
                                    placeholder="Search Here"
                                />
                                {/* <FlatList
                data={this.state.filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView(item)}
                renderItem={this.ItemView(item)}
                /> */}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                                <TouchableWithoutFeedback>
                                    <Image source={require('../../assets/filter.png')} style={{ height: 20, width: 20, marginRight: 10 }} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    {/* fontFamily: 'Poppins' */}
                                    <Text style={{ color: '#282828', fontSize: 14, }}>
                                        Filter
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                        <View>
                            {this.renderrecipes()}
                        </View>
                        {/*<View style={styles.blogview}>
                            <TouchableWithoutFeedback
                             onPress={() =>this.props.navigation.navigate('Recipesdetail')}
                            >
                                <View style={styles.imageview}>
                                <Image source={require('../../assets/restaurant.jpeg')} style={styles.image} />
                                </View>
                                <View style={{ marginLeft: 15, marginRight: 10, marginTop: 5 }}>
                                    <Text style={styles.restauranttitle}>
                                        Perfect avacado toast for breakfast
                                    </Text>
                                    <Text style={styles.nameandplace}>
                                        Sky city Diner, United States
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            </View>*/}

                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: '600',
        // fontFamily: 'Poppins',
        lineHeight: 30,
        color: '#646CE9',
        marginTop: 5,
    },

    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        width: Dimensions.get('window').width - 100,
        height: 38,
        marginLeft: 10,
        backgroundColor: '#EEEFFA',
        borderRadius: 10,
        paddingLeft: 20,
    },
    blogview: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3 - 40,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        // borderWidth:1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    imageview: {
        width: Dimensions.get('window').width - 30,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        width: Dimensions.get('window').width - 32,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    restauranttitle: {
        // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 15,
        color: '#646CE9',
    },
    date: {
        // fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: 10,
        lineHeight: 15,
        color: '#7B8587',
    },
    description: {
        // fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
    },
    nameandplace: {
        // fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 13,
        color: '#7B8587',
    },
    liketext: {
        // fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#282828',
        textAlign: 'center',
        marginTop: 2
    }

});

