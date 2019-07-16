import React,{ Component } from 'react';
import { Image, View, Text, Dimensions, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
//import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'
import Carousel from './Carousel.js'
//from: https://github.com/kkemple/react-native-sideswipe
import image1 from '../assets/placeholder.jpg'
import image2 from '../assets/placeholder2.jpg'
export default class Intro extends Component {

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    const m = 30 //margin
    const iw = width - m * 0 //item width
    const co = (width - iw)/2  //Content Offset
    const data = [
      {image:image1,
        bt:'Next',
        next:()=>this.setState({currentIndex : 1}),
        color:'#ccc' },
      {image:image2,
        bt:'Learn How',
        next:()=> navigate('Home'),
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
            style={{width: iw,
                    padding: styles.border,
                    }}>
          <Image style={{width: iw, height: iw}}
          source={item.image} >
          </Image>
          <View
            style = {{
              width: width,
              padding: 50
            }}>
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

