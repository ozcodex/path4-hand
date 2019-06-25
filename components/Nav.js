import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'

export default class Nav extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigate('Main')}>
          <Image
            style={styles.image}
            height={80}
            source={require('../assets/home.png')}
          />
        </TouchableOpacity>
        { !this.props.hideInfo &&
          <TouchableOpacity style={styles.navButton} onPress={() => navigate('Info')}>
            <Image
              style={styles.image}
              height={80}
              source={require('../assets/mini-dragon.png')}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

