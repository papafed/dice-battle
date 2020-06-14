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
import Speechbubble from './speechbubble';

import { 
  MAX_MONSTERS,
  MAX_KNIGHTS,
  KNIGHT_MULTIPLIER,
  MONSTER_MULTIPLIER
} from '../../constants';
//import Knight from './knight';
//import Monster from './monster';

class Player extends Component {
  constructor(props){
    super(props);
    this.knight = Math.floor(Math.random() * MAX_KNIGHTS) + 1;
    this.monster = Math.floor(Math.random() * MAX_MONSTERS) + 1;
    this.state = {
        rolling: false,
    }

  }

  render() {
    const {kind} = this.props;
    return (
        <div className={`player ${kind} ${kind}-${this[kind]}`}>
          <div className="body"/>
          <div className="arm"/>
          <Progress kind={kind} />
          <Speechbubble kind={kind} number={this[kind]}/>
      </div>
 
    );
  }
}

const mapStateToProps = ({rolling}) => ({
    rolling: rolling
});

const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);