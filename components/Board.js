import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TextInput } from 'react-native';
import Nav from './Nav';
import {border, styles} from '../styles'

export default class Score extends Component {

static navigationOptions = { header: null } 

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your fellow commuters:</Text>
        <FlatList
          data={[
            {key:'1', name: 'Faizaninho1',desc:'10 min collected at U8',time: '3 min. ago', level:5 },
            {key:'2', name: 'Henriko3',desc:'3 min collected at U8',time: '7 min. ago', level:2 },
            {key:'3', name: 'Farnazi09',desc:'12 min collected at U8',time: '8 min. ago', level:1 },
            {key:'4', name: 'Lulululu',desc:'2 min collected at U8',time: '10 min. ago', level:12 },
          ]}
          renderItem={
            ({item}) => 
              <View style={styles.item}>
                <View style={styles.part}>
                  <Text style={styles.textSmall}>{item.name}</Text>
                  <Text style={styles.textSmall}>{item.time}</Text>
                </View>
                <View style={styles.part}>
                  <Text style={styles.boldSmall}>Dragon Lvl. {item.level}</Text>
                  <Text style={styles.boldSmall}>{item.desc}</Text>
                </View>
              </View>
            }
        />
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

