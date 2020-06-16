import React from 'react';

import { connect } from 'react-redux';

import { fight, restart } from './reducers/actions';

import Dice from './components/dice/dice';
import Player from './components/players/player';

import {COMMENTARY} from './constants';

function App(props) {
  const {rolling, gameOver, draw, lastRoundWinner, fight, restart, knight, lastPoints} = props;
  return (
    <div className="App">
      <h1>Dice Battle</h1>
        <Player kind="knight" />
        <Dice player="knight" />
        <Dice player="monster" />
        <Player kind="monster" />
        <button className="button-fight" disabled = {rolling || gameOver} type="button" onClick={fight}>Attack!</button>
        <button className="button-reset" type="button"onClick={restart}>Reset</button>
        <div className="caption">
          {
            draw ? COMMENTARY.draw :
            lastRoundWinner && COMMENTARY[lastRoundWinner].replace('#score', lastPoints)
          }
        </div>
        {
          gameOver &&
            <div className={`gameover ${knight.won ? 'victory' :''}`}>{knight.won ? COMMENTARY.victory : COMMENTARY.gameOver}</div>
        }
    </div>
  );
}

const mapStateToProps = ({rolling, gameOver, draw, lastRoundWinner, lastPoints, knight}) => ({
  rolling,
  gameOver,
  draw,
  lastRoundWinner,
  lastPoints, 
  knight
});

const mapDispatchToProps = {
  fight,
  restart
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
