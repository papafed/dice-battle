/* two dice 
Throws 2 dice and adds their scores together.
needs to know if it is monster or knight
needs to have roll function
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  KNIGHT_SPEECH,
  MONSTER_SPEECH,
  KNIGHT
} from '../../constants';

class PlayerSound extends Component {
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.timeout1 = null;
    this.timeout2 = null;
    this.state = {
      speech : props.kind === KNIGHT ? KNIGHT_SPEECH : MONSTER_SPEECH
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  componentDidUpdate(prevProps, prevState) {
    const {lastRoundWinner, rolling, knight, monster, kind } = this.props;
    
    if (rolling) return;

    this.audioCtx = this.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const audioEl = this.audioRef.current;

    if (lastRoundWinner) {
      const delay = lastRoundWinner === kind ? 500 : 1500;
      this.timeout1 = setTimeout(()=>{
        if (audioEl) audioEl.play();
      }, delay);

      // we want to play this after game over. and after the other sounds have played.
      if (knight.won) {
        this.timeout2 = setTimeout(()=>{ document.getElementById('youwin').play(); }, 3000);
      } else if (monster.won) {
        this.timeout2 = setTimeout(()=>{ document.getElementById('youlose').play(); }, 3000);
      }
    }
  }

  render() {
    const {kind, lastRoundWinner, number } = this.props;
    const weWon = lastRoundWinner && lastRoundWinner === kind;
    return (
      <audio ref={this.audioRef} src={`${process.env.PUBLIC_URL}/sounds/${kind}s/${kind}-${number}-${weWon ? 'attack' : 'ouch'}.mp3`} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lastRoundWinner: state.lastRoundWinner,
    rolling: state.rolling,
    monster: state.monster,
    knight: state.knight
  }
};

export default connect(mapStateToProps, null)(PlayerSound);
