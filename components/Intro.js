import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'
import Carousel from './Carousel.js'
//from: https://github.com/kkemple/react-native-sideswipe
export default class Intro extends Component {

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    const m = 30
    const iw = width - m * 0
    const co = (width - iw)/2
    const data = [
      {text:'Lorem ipsum dolor sit amet, consadipiscing elit.',
        bt:'Next',
        next:()=>this.setState({currentIndex : 1}),
        color:'#ccc' },
      {text:'Nullam condimentum est eget diam rutrum sollicitudin.',
        bt:'Next',
        next:()=>this.setState({currentIndex : 2}),
        color:'#ddd' },
      {text:'Morbi sit amet erat in elit placerat vehicula.',
        bt:'Go',
        next:()=> navigate('Welcome'),
        color:'#eee'} ]
    return (
      <Carousel
        index={this.state.currentIndex}
        itemWidth={iw}
        style={{width}}
        data={data}
        useVelocityForIndex={false}
        threshold={50}
        contentOffset={co}
        onIndexChange={index =>
          this.setState(() => ({ currentIndex: index }))
        }
        renderItem={({ itemIndex, currentIndex, item }) => (
         <View  
            style={{backgroundColor: item.color,
                    width: iw,
                    padding: styles.border,
                    }}>
          <Text
            style={styles.title}>
            Position: {itemIndex}
          </Text>
          <Text
            style={styles.title}>
            Value: {item.text}
          </Text>
          <View
            style = {{
              width: width,
              padding: 50
            }}
            >
            <Button
            onPress={item.next}
            title={item.bt}
            color="#841584"
          />
          </View>
          
        </View>
        )}
      />  
    );
  }
}

