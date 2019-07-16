import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Picker } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class Map extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.state = {
      region: {
        "latitude": 48.132,
        "latitudeDelta": 0.022,
        "longitude": 11.633,
        "longitudeDelta": 0.033,
      },
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region) {
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
            <Marker
              coordinate={{
                "latitude": 48.1278,
                "longitude": 11.6023
                }}
              title="Ostbanhof Custom Marker"
              description="10 Waiting; 10% delay; smile :)"
            />
          </MapView>
        </View>
        <View style={styles.mapComplement}>
          <Text style={styles.text}>The Spanish Inquisition, because nobody expects the spanish inquisition</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{navigate('Home')}}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

