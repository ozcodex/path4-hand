import React,{ Component } from 'react';
import { Alert, View, Text, Dimensions, TouchableOpacity, Picker } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
import MapView from 'react-native-maps';
import { Marker,Callout } from 'react-native-maps'
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class Map extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.state = {
      region: {
        "latitude": 48.1284788,
        "latitudeDelta": 0.0346563,
        "longitude": 11.60298323,
        "longitudeDelta": 0.0519225,
      },
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.onRegionChange = this.onRegionChange.bind(this)
    this.findCoordinates = this.findCoordinates.bind(this)
  }
  
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          longitude: position.coords.longitude - ( this.state.region.longitudeDelta / 2),
          latitude: position.coords.latitude - ( this.state.region.latitudeDelta / 2),
          longitudeDelta : this.state.region.longitudeDelta,
          latitudeDelta: this.state.region.latitudeDelta
        }
        this.setState({ region });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  onRegionChange(region) {
    //console.log(region);
    //this.setState({ region });
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View>
        <View style={styles.mapContainer} >
          <MapView style={styles.map} 
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            showsTraffic>
            <Marker coordinate={{
                "latitude": 48.1278,
                "longitude": 11.6023
              }}>
              <View>
                <Callout onPress={()=>{navigate('Home')}}>
                   <Text>Oh bella ciao</Text>
                   <Text>Touch to go home</Text>
                </Callout>
              </View>
            </Marker>
          </MapView>
        </View>
        <View style={styles.mapComplement}>
          <Text style={styles.text}>The Spanish Inquisition, because nobody expects the spanish inquisition</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{navigate('Home')}}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.findCoordinates}>
            <Text style={styles.buttonText}>Center on me!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

