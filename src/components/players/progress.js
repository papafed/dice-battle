/* two dice 
Throws 2 dice and adds their scores together.
needs to know if it is monster or knight
needs to have roll function
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  KNIGHT_HP,
  MONSTER_HP,
  KNIGHT
} from '../../constants';

class Progress extends Component {
  constructor(props){
    super(props);
    const max = props.kind === KNIGHT ? KNIGHT_HP : MONSTER_HP
    this.state = {
        max,
        value: max
    }
  }

  render() {
    const value = typeof this.props.value !== 'undefined' ? this.props.value : this.state.value;
    const height = value > 0 ? (value / this.state.max) * 100 : 0;  
    return (
      <div className="progressbar">
        <div className="block" style={ { height : `${ height }%` } }></div>
        <p>{value}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    value: state[props.kind].hp
  }
};

export default connect(mapStateToProps, null)(Progress);
