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
    this.state = {
        value: 0
    }
  }

  static getDerivedStateFromProps = (props) => {
    if (props.rolling) {
      const value =  Math.floor(Math.random() * DICE_SIDES) + 1;
      console.log(props.player,'rolled a', value);
      props.rollCallback(value, props.die);
      return {value}
    } else {
      return null;
    }
  }

  render() {
    const {rolling, player} = this.props;
    const {value} = this.state;

    return <p>{value}</p>
    return (
      <div className={`die ${player} ${rolling ? 'rolling': ''} value-${value}`}>
        <div className="face face-1">
            <div className="dot"></div>
        </div>
        <div className="face face-2">
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div className="face face-3">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div className="face face-4">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div className="face face-5">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div className="face face-6">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rolling: state.rolling
  }
};


export default connect(mapStateToProps, null)(Dice);