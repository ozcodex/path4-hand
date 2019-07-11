import {Dimensions, StyleSheet} from 'react-native';

export {border, styles}

const border = 50
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
  textBig: {
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
    textAlign: 'center',
  },
  boldBig: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  bold: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  boldSmall: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  central:{
  },
  image: {
   
  },
  navContainer: {
    flex:0,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 20,
    width: Dimensions.get('window').width - border * 2,
  },
  buttonText:{
    //flex:1,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttoffText:{
    //flex:1,
    color: '#000',
    fontWeight: 'bold',
  },
  button:{
    //flex:1,
    padding: Math.ceil(border/3),
    backgroundColor: '#841584',
    margin: Math.ceil(border/4)
  },
  buttoff:{
    //flex:1,
    padding: Math.ceil(border/3),
    backgroundColor: '#848484',
    margin: Math.ceil(border/4)
  },
  part:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item:{
    width: Dimensions.get('window').width - border * 2,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: border
  },
})

