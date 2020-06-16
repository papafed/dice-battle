/* 
Single player 

The player has the following features:
a bar of energy 0-100
a function to reduce energy
an attack animation
an attack sound
an ouch sound
a random tweety birds sound when hit
some random dialog.
some dialog triggered by low energy.
*/

/* two dice 
Throws 2 dice and adds their scores together.
needs to know if it is monster or knight
needs to have roll function
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Progress from './progress';
import SpeechBubble from './speechbubble';
import PlayerSound from './playersound';

import { 
  MAX_MONSTERS,
  MAX_KNIGHTS
} from '../../constants';
//import Knight from './knight';
//import Monster from './monster';

class Player extends Component {
  constructor(props){
    super(props);
    this.knight = Math.floor(Math.random() * MAX_KNIGHTS) + 1;
    this.monster = Math.floor(Math.random() * MAX_MONSTERS) + 1;
  }

  render() {
    const {kind, rolling, lastRoundWinner} = this.props;
    return (
        <div className={`player ${kind} ${kind}-${this[kind]} ${!rolling && lastRoundWinner && lastRoundWinner === kind ? 'animate' : ''}`}>
          <div className="person">
            <div className="body"/>
            <div className="arm"/>
          </div>
          <Progress kind={kind} />
          { !rolling && lastRoundWinner && 
            <SpeechBubble kind={kind} number={this[kind]}/>
          }
          <PlayerSound kind={kind} number={this[kind]}/>
      </div>
 
    );
  }
}

const mapStateToProps = ({rolling, lastRoundWinner}) => ({
    rolling,
    lastRoundWinner
});

const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);