/* two dice 
Throws 2 dice and adds their scores together.
needs to know if it is monster or knight
needs to have roll function
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setValue } from '../../reducers/actions';

import Die from './die';

class Dice extends Component {
  constructor(props){
    super(props);
    this.value=0;
    this.state = {
        value: 0
    }
  }

  calculateScore = (val, die) => {
    if (die === 1) {
      this.value = val;
    } else {
      const newValue = this.value + val;
      this.props.setValue(newValue, this.props.player);
      this.value = 0;
    }
  }

  render() {
    const {player, rolling} = this.props;
    return (
        <div className={`dice ${player} ${rolling ? 'rolling': ''}`}>
          <Die player={player} die={1} rollCallback={this.calculateScore} />
          <Die player={player} die={2} rollCallback={this.calculateScore} />
      </div>
 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rolling: state.rolling
  }
};


export default connect(mapStateToProps, { setValue })(Dice);