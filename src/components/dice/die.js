/*
One die.

Each die has 
a score
an appearance (monster or player)
draw die and pan sound left or right depending on monster or player
up or down xyz, depending on 1st or 2nd
sound, and animation.
a throw method.
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DICE_SIDES } from '../../constants';



class Dice extends Component {
  constructor(props){
    super(props);
    this.audioRef1 = React.createRef();
    this.audioRef2 = React.createRef();
    this.state = {
        value: 0
    }
  }

  static getDerivedStateFromProps = (props) => {
    if (props.rolling) {
      const value =  Math.floor(Math.random() * DICE_SIDES) + 1;
      setTimeout(()=>{
        props.rollCallback(value, props.die);
      }, 4000);
      
      return {value}
    } else {
      return null;
    }
  }

  componentDidUpdate() {
    if (this.props.rolling) {

    }
  }

  render() {
    const {rolling, player} = this.props;
    const {value} = this.state;

    return (
    <>
      { rolling && <>
        <audio ref={this.audioRef1} src={`${process.env.PUBLIC_URL}/sounds/dice/dice-1.mp3`} autoPlay />
        <audio ref={this.audioRef2} src={`${process.env.PUBLIC_URL}/sounds/dice/dice-2.mp3`} autoPlay />
        </>
      }
        <div className={`die ${player} ${rolling ? 'rolling': ''} value-${value}`}>
      <div className="side front">
        <div className="dot center"></div>
      </div>
      <div className="side front inner"></div>
      <div className="side top">
        <div className="dot dtop dleft"></div>
        <div className="dot dbottom dright"></div>
      </div>
      <div className="side top inner"></div>
      <div className="side right">
        <div className="dot dtop dleft"></div>
        <div className="dot center"></div>
        <div className="dot dbottom dright"></div>
      </div>
      <div className="side right inner"></div>
      <div className="side left">
        <div className="dot dtop dleft"></div>
        <div className="dot dtop dright"></div>
        <div className="dot dbottom dleft"></div>
        <div className="dot dbottom dright"></div>
      </div>
      <div className="side left inner"></div>
      <div className="side bottom">
        <div className="dot center"></div>
        <div className="dot dtop dleft"></div>
        <div className="dot dtop dright"></div>
        <div className="dot dbottom dleft"></div>
        <div className="dot dbottom dright"></div>
      </div>
      <div className="side bottom inner"></div>
      <div className="side back">
        <div className="dot dtop dleft"></div>
        <div className="dot dtop dright"></div>
        <div className="dot dbottom dleft"></div>
        <div className="dot dbottom dright"></div>
        <div className="dot center dleft"></div>
        <div className="dot center dright"></div>
      </div>
      <div className="side back inner"></div>
      <div className="side cover x"></div>
      <div className="side cover y"></div>
      <div className="side cover z"></div>
    </div>
     </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rolling: state.rolling
  }
};


export default connect(mapStateToProps, null)(Dice);