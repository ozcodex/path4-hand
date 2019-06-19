import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TextInput } from 'react-native';
import Nav from './Nav';

const border = 50;

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
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.time}</Text>
                </View>
                <View style={styles.part}>
                  <Text style={styles.bold}>Dragon Lvl. {item.level}</Text>
                  <Text style={styles.bold}>{item.desc}</Text>
                </View>
              </View>
            }
        />
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: border,
  },
  part:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item:{
    width: Dimensions.get('window').width - border * 2,
    flexDirection: 'column',
  },
  text: {
    //flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  central:{
    //flex: 2
  },
  image: {
    
  },
  button:{
    //flex:1,
    backgroundColor: '#81FFC9',
  },
  bold: {
    //flex: 2,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    //flex: 2,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: border
  },
});
