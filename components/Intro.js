import React,{ Component } from 'react';
import { Image, View, Text, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
//import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'
import Carousel from './Carousel.js'
//from: https://github.com/kkemple/react-native-sideswipe
import image1 from '../assets/delayla.jpg'
import image2 from '../assets/delayla2.png'
export default class Intro extends Component {

  state = {
    currentIndex: 0,
  };
  static navigationOptions = { header: null }
  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    const m = 30 //margin
    const iw = width - m * 0 //item width
    const co = (width - iw)/2  //Content Offset
    const data = [
      {image:image1,
        text:"Welcome to Delayla! Explore more by reporting your first delay !",
        bt:'Next',
        next:()=>this.setState({currentIndex : 1}),
        color:'#ccc' },
      {image:image2,
        text:"Delayla is offering you the opportunity to raise one of her baby dragons.",
        bt:'Learn How',
        next:()=> navigate('Pick'),
        color:'#eee'} ]
    return (
      <View style={styles.container}>
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
          <Image style={{width: iw, height: iw}}
          source={item.image} >
          </Image>
          <Text style={styles.textBig}>{item.text}</Text>
          <TouchableOpacity style ={styles.button} onPress={item.next}>
            <Text style={styles.buttonText}>{item.bt}</Text>
          </TouchableOpacity>
        </View>
        )}
      />
      </View>
    );
  }
}

