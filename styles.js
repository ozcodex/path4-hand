import {StyleSheet} from 'react-native';

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
    paddingHorizontal: border,
  },
  text: {
    //flex: 1,
    fontSize: 20,
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
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
})

