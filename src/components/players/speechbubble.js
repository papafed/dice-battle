/* two dice 
Throws 2 dice and adds their scores together.
needs to know if it is monster or knight
needs to have roll function
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  KNIGHT_SPEECH,
  MONSTER_SPEECH
} from '../../constants';

class Speechbubble extends Component {
  constructor(props){
    super(props);
    this.state = {
      speech : props.kind === 'knight' ? KNIGHT_SPEECH : MONSTER_SPEECH
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {kind, lastRoundWinner, number, rolling } = this.props;
    const {speech} = this.state;
    const value =  Math.floor(Math.random() * speech.won.length);
    const weWon = lastRoundWinner && lastRoundWinner === kind;
// need to delay proceedings so that the audio plays.
    return rolling ? (
      <audio src="%PUBLIC_URL%/sounds/dice/dice2.mp3" autoPlay={true} />
    ) :
    ( lastRoundWinner &&
      <div className={`speechbubble ${kind}`}>
        {
          
          this.props[kind].won ? <p>{speech.victory}</p> : weWon ? <p>{speech.won[value]}</p> : <p>{speech.ouch}</p>
        }
      <audio src={`${process.env.PUBLIC_URL}/sounds/${kind}s/${kind}-${number}-${weWon ? 'attack' : 'ouch'}.mp3`} autoPlay={true} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('speech state', state)

/*
draw: false
gameOver: false
knight:
hp: 100
roll: 3
won: false
__proto__: Object
lastRoundWinner: "knight"
monster:
hp: 97
roll: 0
won: false
__proto__: Object
rolling: false
__proto__: Object

*/

  return {
    draw: state.draw,
    gameOver: state.gameOver,
    lastRoundWinner: state.lastRoundWinner,
    rolling: state.rolling,
    monster: state.monster,
    knight: state.knight
  }
};

export default connect(mapStateToProps, null)(Speechbubble);
