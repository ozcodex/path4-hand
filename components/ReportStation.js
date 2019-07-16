import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'

export default class ReportStation extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.state = { text: 'Ostbahnhof München' };
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Whats your current Station?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.button} onPress={()=>{navigate('ReportLine',{station: this.state.text})}}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

