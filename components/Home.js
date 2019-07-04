import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'
import Carousel from './Carousel.js'

export default class Home extends Component {

  state = {
    currentIndex: 0,
  };

  render() {

    const { width } = Dimensions.get('window');
    const m = 30
    const iw = width - m * 0
    const co = (width - iw)/2
    const data = ['a','b','c']
    const col = ['#ff0','#00b','#f00']
    return (
      <Carousel
        index={this.state.currentIndex}
        itemWidth={iw}
        style={{width}}
        data={data}
        useVelocityForIndex={false}
        contentOffset={co}
        onIndexChange={index =>
          this.setState(() => ({ currentIndex: index }))
        }
        renderItem={({ itemIndex, currentIndex, item }) => (
         <View  
            style={{backgroundColor: col[itemIndex],
                    width: iw,
                    height: 300,
                    }}>
          <Text>
            Position: {itemIndex}
          </Text>
          <Text>
            Value: {item}
          </Text>
        </View>
        )}
      />  
    );
  }
}

