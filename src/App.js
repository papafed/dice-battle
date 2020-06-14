import React from 'react';

import { connect } from 'react-redux';

import { fight, restart } from './reducers/actions';

import Dice from './components/dice/dice';
import Player from './components/players/player';

import {COMMENTARY} from './constants';
import './App.css';

function App(props) {
  const {rolling, gameOver, draw, lastRoundWinner, fight, restart} = props;
  return (
    <div className="App">
        <Player kind="knight" />
        <Dice player="knight" />
        <Dice player="monster" />
        <Player kind="monster" />
        <button className="button-fight" disabled = {rolling || gameOver} type="button" onClick={fight}>Fight!</button>
        <button className="button-reset" type="button"onClick={restart}>Reset</button>
        <div className="caption">
          {
            draw ? COMMENTARY.draw :
            lastRoundWinner && COMMENTARY[lastRoundWinner].replace('#score', props[lastRoundWinner])
          }
        </div>
        {
          gameOver &&
            <div className="gameover">{COMMENTARY.gameOver}</div>
        }
    </div>
  );
}

const mapStateToProps = ({rolling, gameOver, draw, lastRoundWinner, monster, knight}) => ({
  rolling,
  gameOver,
  draw,
  lastRoundWinner,
  monster: monster.roll,
  knight: knight.roll
});

const mapDispatchToProps = {
  fight,
  restart
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
