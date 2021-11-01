import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Platform, Dimensions } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import Entypo from 'react-native-vector-icons/Entypo';
import { Thumbnail } from 'react-native-thumbnail-video';
import { BASE_URL } from '../api';
import YoutubePlayer from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';

export default class Episodes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            margintop: 0,
            textcolor1: '#6A71DF',
            textcolor2: '#000000',
            showseason1: true,
            showseason2: false,
            bordercolor: '#6A71DF',
            listofepisodes: [],
            userid: '',
            seasontitle: '',
            listofseasons: [],
            showloader:false,
        }
    }


    async componentDidMount() {

        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });
        console.log('userid', this.state.userid);

        await this.getseasons()

        await this.getepisodes()
    }

    changetextcolor(value) {
        if (value === '1') {
            this.setState({
                textcolor1: '#6A71DF',
                textcolor2: '#000000',
                showseason1: true,
                showseason2: false,
                // bordercolor1:'#6A71DF'
            })
        }
        if (value === '2') {
            this.setState({
                textcolor1: '#000000',
                textcolor2: '#6A71DF',
                showseason1: false,
                showseason2: true,
                // bordercolor1:'#6A71DF'
            })
        }
    }

    getseasons = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "posts/posts?type=season&of="+this.state.userid , requestOptions)  //5f4e9fc590442b466a0910e9
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.state.listofseasons.length == 0;
                if(result.data.records.length == 0){
                    alert('No data found')
                } else {
                for (let i = 0; i < result.data.records.length; i++) {

                    this.state.listofseasons.push(result.data.records[i])
                }
            }
            })
            .catch(error => console.log('error', error));
    }

    getepisodes = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "posts/posts?type=episode&limit=50&of=60a025e19b1cf65682c8c691", requestOptions)  //+this.state.userid  60a025e19b1cf65682c8c691
            .then(response => response.json())
            .then(result => {
                console.log('episodes',result)
                this.state.listofepisodes.length == 0;
                if (result.success == true) {
                    // console.log('title:',result.of.title)
                    this.setState({ seasontitle: result.of.title })
                    if(result.data.records.length == 0){
                        alert('No data found')
                    } else {
                    for (let i = 0; i < result.data.records.length; i++) {

                        this.state.listofepisodes.push(result.data.records[i])
                    }
                }
                    this.setState({ showloader: !this.state.showloader })
                }
            })
            .catch(error => console.log('error', error));
    }


    renderseason1 = () => {
        return this.state.listofepisodes.map((item) => {
            return (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.navigation.navigate('Episodedetail',{slugvalue:item.slug})}
                        >
                            <View style={styles.videoview}>
                                <Thumbnail url={'https://www.youtube.com/watch?v=eVbt6oVkbdk'}
                                    imageWidth={70}
                                    imageHeight={70}
                                    //containerStyle={{width:75,height:75,borderRadius:10}}
                                    iconStyle={{ height: 5, width: 5 }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.navigation.navigate('Episodedetail',{slugvalue:item.slug})}
                        >
                            <View style={{ width: Dimensions.get('window').width - 100, height: 75, marginRight: 5 }}>
                                <Text style={styles.episodetitle}>
                                    {/* Totally fried */}
                                    {item.title}
                                </Text>
                                <Text style={styles.episodedate}>
                                    {/* Episode 1 | January 18, 2020 */}
                                    {item.post_code} | {item.publish_date}
                                </Text>
                                <View style={{ flexDirection: 'row', height: 40, width: Dimensions.get('window').width - 110 }}>
                                    <Text style={styles.episodedescription}>
                                        {/* Contrary to popular belief, Lorem Ipsum is not simply random text. It has ro... */}
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
        })
    }

    renderseasontitle = () => {
        return this.state.listofseasons.map((item) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => this.changetextcolor('1')}
                        style={{margin:10}}
                       // style={{ margin: 10, borderBottomWidth: this.state.showseason1 ? 1 : null, borderBottomColor: this.state.showseason1 ? this.state.bordercolor : null }}
                    >
                        <Text style={styles.season1style}>
                            {/* Season 1 */}
                            {item.title}
                        </Text>
                    </TouchableOpacity>
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
                <View style={{ marginTop: Platform.OS == 'android' ? 15 : 35, marginLeft: 10 }}>
                    <Text style={styles.heading}>
                        Episodes
                    </Text>
                </View>

                <View>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row' }}>
                            {this.renderseasontitle()}
                           {/* <TouchableWithoutFeedback
                                onPress={() => this.changetextcolor('1')}
                                style={{ margin: 10, borderBottomWidth: this.state.showseason1 ? 1 : null, borderBottomColor: this.state.showseason1 ? this.state.bordercolor : null }}
                            >
                                <Text style={styles.season1style, [{ color: this.state.textcolor1 }]}>
                                    Season 1
                                </Text>
                            </TouchableWithoutFeedback>
                             <TouchableWithoutFeedback
                                onPress={() => this.changetextcolor('2')}
                                style={{ margin: 10, borderBottomWidth: this.state.showseason2 ? 1 : null, borderBottomColor: this.state.showseason2 ? this.state.bordercolor : null }}
                            >
                                <Text style={styles.seasonstyle, [{ color: this.state.textcolor2 }]}>
                                    Season 2
                                </Text>
                            </TouchableWithoutFeedback> */}
                            {/* <TouchableWithoutFeedback
                   // onPress={() =>this.changetextcolor('1')}
                   //style={{margin:10,borderBottomWidth:this.state.showseason1?1:null,borderBottomColor:this.state.showseason1?this.state.bordercolor:null}}
                    >
                        <Text style={styles.seasonstyle}>
                            Season 3
                        </Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                   // onPress={() =>this.changetextcolor('1')}
                    //style={styles.seasonbtn}
                    >
                        <Text style={styles.seasonstyle}>
                            Season 4
                        </Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                   // onPress={() =>this.changetextcolor('1')}
                   // style={styles.seasonbtn}
                    >
                        <Text style={styles.seasonstyle}>
                            Season 5
                        </Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                   // onPress={() =>this.changetextcolor('1')}
                   // style={styles.seasonbtn}
                    >
                        <Text style={styles.seasonstyle}>
                            Season 6
                        </Text>
                    </TouchableWithoutFeedback> */}
                        </View>
                    </ScrollView>
                </View>

                <ScrollView>
                    {this.state.showseason1 ?
                        <View>
                            {this.renderseason1()}
                        </View>
                        : null}
                    {this.state.showseason2 ?
                        <View>
                            {this.renderseason1()}
                        </View>
                        // <View>
                        //     <View style={{ flexDirection: 'row' }}>
                        //         <View style={styles.videoview}>
                        //             <Thumbnail url={'https://www.youtube.com/watch?v=eVbt6oVkbdk'}
                        //                 imageWidth={70}
                        //                 imageHeight={70}
                        //                 //containerStyle={{width:75,height:75,borderRadius:10}}
                        //                 iconStyle={{ height: 5, width: 5 }}
                        //             />
                        //         </View>
                        //         <View style={{ width: Dimensions.get('window').width - 100, height: 75 }}>
                        //             <Text style={styles.episodetitle}>
                        //                 Totally fried2
                        //             </Text>
                        //             <Text style={styles.episodedate}>
                        //                 Episode 1 | January 18, 2020
                        //             </Text>
                        //             <View style={{ flexDirection: 'row' }}>
                        //                 <Text style={styles.episodedescription}>
                        //                     Contrary to popular belief, Lorem Ipsum is not simply random text. It has ro...
                        //                 </Text>
                        //             </View>
                        //         </View>
                        //     </View>
                        // </View>
                        : null}
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: '600',
        // fontFamily:'Poppins',
        lineHeight: 30,
        color: '#646CE9'
    },
    season1style: {
        fontSize: 16,
        fontWeight: '500',
        // fontFamily:'Poppins',
        lineHeight: 24,
        //color:this.state.textcolor1,
        //textDecorationLine:'underline'
    },
    seasonstyle: {
        fontSize: 16,
        fontWeight: '500',
        // fontFamily:'Poppins',
        lineHeight: 24,
        //color:this.state.textcolor,
    },
    seasonbtn: {
        margin: 15
    },
    episodetitle: {
        fontSize: 16,
        fontWeight: '500',
        // fontFamily:'Poppins',
        lineHeight: 24,
        color: '#646CE9',
    },
    episodedescription: {
        fontSize: 12,
        fontWeight: '500',
        // fontFamily:'Poppins',
        lineHeight: 18,
        color: '#596768',
        flex: 1
    },
    episodedate: {
        fontSize: 10,
        fontWeight: 'normal',
        // fontFamily:'Poppins',
        lineHeight: 15,
        color: '#282828',
    },
    videoview: {
        height: 75,
        width: 75,
        borderRadius: 10,
        marginTop: 0,
        margin: 10,
        backgroundColor: 'rgba(0,0,0,0.09)',
        alignItems: 'center',
        justifyContent: 'center'
    },

});

