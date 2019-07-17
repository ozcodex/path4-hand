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
    this.current_region = {
      "latitude": 48.1284788,
      "latitudeDelta": 0.0316563,
      "longitude": 11.60298323,
      "longitudeDelta": 0.0479225,
    }
    this.state = {
      region : this.current_region,
      markers : []
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.onRegionChange = this.onRegionChange.bind(this)
    this.findCoordinates = this.findCoordinates.bind(this)
    this.loadStations = this.loadStations.bind(this)
    this.loadStations();
  }

  loadStations(){
    //this function load the stations on the current region
    let region = this.current_region
    let min_lon = region.longitude
    let min_lat = region.latitude
    let d_lon = region.longitudeDelta
    let d_lat = region.latitudeDelta
    //aux function to generate random numbers both inclusive
    let ran = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
    states=['low','medium','high']
    db.collection('stations')
      .where('longitude','>', min_lon - d_lon/2)
      .where('longitude','<', min_lon + d_lon/2)
      .get().then(
      (snapshot) => {
        let my_stations = []
        stations = snapshot.docs
        let i;
        for(i = stations.length - 1; i >= 0; i--){
          station = stations[i]
          station_data = station.data()
          lat = station_data.latitude
          lon = station_data.longitude
          if ( lat > min_lat - d_lat/2 && lat < min_lat + d_lat/2 ){
            //this mean than the value is in the range
            my_stations.push({
              coordinates : {
                longitude : lon,
                latitude : lat
                },
              name : station_data.name,
              prediction: [
                states[ran(0,2)],states[ran(0,2)]
              ]
            })
          } 
        }
        //to this point my_stations content all the info of the stations
        //console.log(my_stations)
        this.setState({
          region: region,
          markers: my_stations
        })
      })
  }
  
  findCoordinates = () => {
    //this function take the coordinates of the user and put it on the state
    //so the map is redrawed bun tow centered on the user
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
    this.current_region = region;
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
            { this.state.markers.map((item, key)=>(
              <Marker key={key} coordinate={item.coordinates}>
                <Callout onPress={()=>{/*navigate('Home')*/}}>
                   <Text style={styles.bold}>{item.name}</Text>
                   <Text>Currently: {item.prediction[0]} delay risk</Text>
                   <Text>Next Hour: {item.prediction[1]} delay risk</Text>
                </Callout>
              </Marker>
            ))}
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
          <TouchableOpacity style={styles.button} onPress={this.loadStations}>
            <Text style={styles.buttonText}>Load Stations</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

