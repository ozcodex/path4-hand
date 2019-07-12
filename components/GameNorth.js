import React,{ Component } from 'react';
import { Alert,View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class Welcome extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      move: 0,      // your move
      status: 0,    // the status of the game
      result: 0,    // the result of the game
      gamecode: "", // code of the current game
      enemymove: 0, // the move of your opponent
      role: ''      // the role that you have on the current game (host or guest)
    };
    /* The possible values of STATUS are
     *  0 - Connecting 
     *  1 - looking for other player
     *  2 - playing 
     *  3 - waiting
     *  4 - game finished
     *  
     *  The possible values for RESULT are 
     *  0 - undefined
     *  1 - you lose
     *  2 - you win
     *  3 - tie
     */
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.move = this.move.bind(this);
    this.watchGame = this.watchGame.bind(this);
    this.restart = this.restart.bind(this);
  }  

  static navigationOptions = { header: null } 
  
  componentDidMount(){
    this.connect()
  }

  componentWillUnmount() {
    this.disconnect()
  }

  disconnect(next){
    //next is a function with the next action (to chain functions)
    var colectionRef = db.collection('games');
    //search for the game
    var queryRef = colectionRef.where('gamecode', '==', this.state.gamecode);
    queryRef.get().then(snap => {
      let gameRef = snap.docs[0].ref
      gameRef.set({
          state: 'finished'
        },{merge:true})
      // if there are a next function declared, execute it
      if (next) next();
    })
    console.log('im closing the game:', this.state.gamecode) 
  }

  restart(){      
    //reset the state
    this.setState({
      move: 0,
      status: 0,
      result: 0,
      gamecode: "",
      enemymove: 0,
      role: ''
    });
    //disconect from the current game and connect to a new one
    this.disconnect(this.connect)
  }  

  move(value){
    //change the state to the next value
    this.setState({
        move:value,
        status : 3,
      })
    var colectionRef = db.collection('games');
    //search for the game
    var queryRef = colectionRef.where('gamecode', '==', this.state.gamecode);
    queryRef.get().then(snap => {
      let gameRef = snap.docs[0].ref
      let gameUpdate = {}
      //update the move on database using the role of the user
      gameUpdate[this.state.role+'_move']= value
      gameRef.set(gameUpdate,{merge:true})
    })
  }
  
  connect = () => {
    // function to generate the code game
    var codeGen = () => {
      let coder = i => (i).toString(36);
      // function to generate a random number between two values, both inclusive
      let ran = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
      // 46655 is the max number to get a 3 digit base 36 code (equivalent to zzz)
      // 1296 is the min number to get 3 digit (less will have only 2 digits)
      // basse 36 is the codification selected because have all the alpha-numeric (ignoring case) characters
      return coder(ran(1296,46655))
    }   
    var colectionRef = db.collection('games');  
    //check for open games
    var queryRef = colectionRef.where('state', '==', 'open');
    queryRef.get().then(
    snapshot => {
      let gameRef;
      let role = ''
      let next_status = 1;
      if (snapshot.empty){
        //if there are no open games, create new game
        gameRef = colectionRef.doc()
        gameRef.set({
          state: 'open',
          gamecode : codeGen()
        })
        //if you are creating the game, you are the host 
        role = 'host'
      }else{
        //if you are'nt creating the game, you are joining one
        //join a random game
        //generate a random index
        i = Math.floor(Math.random() * snapshot.size);
        //join the game
        gameRef = snapshot.docs[i].ref
         gameRef.set({
          state: 'closed'
        },{merge:true})
        next_status++;
        role = 'guest'
      }
      //at this point gameRef is pointing to the game,
      //even if is a new one or a you are joining
      gameRef.get().then(game_snap => {
        let game = game_snap.data()
        //take the data of the game and 
        this.setState({
                  gamecode : game.gamecode,
                  status: next_status,
                  role: role
                });
        this.watchGame(game.gamecode);
      })
    });
  }

  //this function is the one who triger events
  //when there are changes on the game in db
  watchGame(gamecode){
    var colectionRef = db.collection('games');
    //search for the game
    var queryRef = colectionRef.where('gamecode', '==', gamecode);
    var observer = queryRef.onSnapshot(snap => {
      let data = snap.docs[0].data();
      let gameRef = snap.docs[0].ref
      if(this.state.role == 'host'){
        //im host
        this.setState({
            enemymove: data.guest_move
          })
      }else{
        //im guest
        this.setState({
            enemymove: data.host_move
          })
      }
      //check if the game is completed
      if(data.host_move && data.guest_move){
        //tie
        if(data.host_move == data.guest_move){
          this.setState({
            state: 4,
            result:3
          })
          let gameUpdate = {
            state : 'finished'
          }
          gameRef.set(gameUpdate,{merge: true})
        }else{
          //define the winner
          let h = data.host_move 
          let g = data.guest_move
          //uses logic to calculate the winner
          let host_loses = ( (h == 3 && g == 1 ) || ( h < 3 && g == h + 1)) 
          let result = 0;
          if(this.state.role == 'host'){
            //im host
            result = host_loses?1:2;
            gameRef.set({
              state: 'finished'
            },{merge:true}) 
          }else{
            //im guest
            result = host_loses?2:1;
          }
          this.setState({
            status : 4,
            result : result
          });
        }  
      }
      
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  };

  render() {
    const statuses = ['Conecting...','Looking 4 other player','Playing','Waiting','Game End']
    const moves = ['Undefined','Old Lady','Tiger','Samurai']
    const results = ['Undefined','You Lose','You Win','Tie']
    const navigate = this.props.navigation.navigate;
    let butsty = this.state.move == 0 ? styles.button:styles.buttoff
    let sty1 = this.state.move == 1 ? styles.buttoffText:styles.buttonText
    let sty2 = this.state.move == 2 ? styles.buttoffText:styles.buttonText
    let sty3 = this.state.move == 3 ? styles.buttoffText:styles.buttonText
    let press = (m) => {
      if(this.state.move == 0){
        this.move(m)
      }
    }
    let p = this.state.enemymove != 0 //enemy moved?
    let q = this.state.move != 0  //i moved?
    var opmove = !p || q ? moves[this.state.enemymove] : '???'
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          North Game
        </Text>
        <Text style={styles.text}>Status: {statuses[this.state.status]}</Text>
        <Text style={styles.text}>Game code: {this.state.gamecode}</Text>
        <View>
          <TouchableOpacity style = {butsty} onPress={() => press(1)}>
            <Text style={sty1}>{moves[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={butsty} onPress={() => press(2)}>
            <Text style={sty2}>{moves[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={butsty} onPress={() => press(3)}>
            <Text style={sty3}>{moves[3]}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Opponent Move: {opmove}</Text>
        <Text style={styles.text}>Result: {results[this.state.result]}</Text>
        <TouchableOpacity style ={styles.button} onPress={() => this.restart()}>
          <Text style={styles.buttonText}>New Game!</Text>
        </TouchableOpacity>
      </View>
    );
  }
    
}

