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

class SpeechBubble extends Component {
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.timeout = null;
    this.state = {
      showBubble: false,
      speech : props.kind === KNIGHT ? KNIGHT_SPEECH : MONSTER_SPEECH
    }
  }

  componentDidMount() {
    const {lastRoundWinner, kind} = this.props;
 
    if (lastRoundWinner) {
      const delay = lastRoundWinner === kind ? 500 : 1500;
      this.timeout = setTimeout(()=>{
        this.setState({ showBubble:true });
      }, delay);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {kind, lastRoundWinner} = this.props;
    const {speech, showBubble} = this.state;
    const value =  Math.floor(Math.random() * speech.won.length);
    const weWon = lastRoundWinner && lastRoundWinner === kind;

    const phrase = this.props[kind].won ? speech.victory : weWon ? speech.won[value] : speech.lost;

    return showBubble && (
      <div className="speechbubble">
        <span dangerouslySetInnerHTML={ { __html: phrase } }></span>
      </div>
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

export default connect(mapStateToProps, null)(SpeechBubble);
