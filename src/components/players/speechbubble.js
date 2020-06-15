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

class Speechbubble extends Component {
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.timeout = null;
    this.state = {
      speech : props.kind === KNIGHT ? KNIGHT_SPEECH : MONSTER_SPEECH
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidUpdate() {
    const {lastRoundWinner, rolling, knight, monster, kind } = this.props;
    if (rolling) return;
    this.audioCtx = this.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const audioEl = this.audioRef.current;
    if (audioEl) {
      this.source = this.source || this.audioCtx.createMediaElementSource(audioEl);
      const panNode = this.audioCtx.createStereoPanner();
      panNode.pan.setValueAtTime(kind === KNIGHT ? -1: 1, 0);
      this.source.connect(panNode);
      panNode.connect(this.audioCtx.destination);
    }

    if (lastRoundWinner) {

      const delay = lastRoundWinner === kind ? 500 : 1600;

      this.timeout = setTimeout(()=>{
        // if you click too fast this closure isn't there to play.
        if (audioEl) audioEl.play();
      }, delay);

      // we want to play this after game over. and after the other sounds have played.
      if (knight.won) {
        setTimeout(()=>{
          if (audioEl) {
            audioEl.setAttribute('src',`${process.env.PUBLIC_URL}/sounds/youwin.mp3`);
            audioEl.play();
          }
        }, 2000);
      } else if (monster.won) {
        setTimeout(()=>{
          if (audioEl) {
            audioEl.setAttribute('src',`${process.env.PUBLIC_URL}/sounds/youlose.mp3`);
            audioEl.play();
          }
        }, 2000);
      }
    }

    
  }

  render() {
    const {kind, lastRoundWinner, rolling, number } = this.props;
    const {speech} = this.state;
    const value =  Math.floor(Math.random() * speech.won.length);
    const weWon = lastRoundWinner && lastRoundWinner === kind;

    const phrase = this.props[kind].won ? speech.victory : weWon ? speech.won[value] : speech.lost;

    return !rolling && lastRoundWinner && (
      <div className="speechbubble">
        <span dangerouslySetInnerHTML={ { __html: phrase } }></span>
        <audio  ref={this.audioRef} src={`${process.env.PUBLIC_URL}/sounds/${kind}s/${kind}-${number}-${weWon ? 'attack' : 'ouch'}.mp3`} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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
