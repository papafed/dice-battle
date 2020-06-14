import {
  FIGHT,
  SETVALUE,
  RESTART,
  RUNAWAY
} from '../constants';

const initialState = {
  rolling: false,
  gameOver: false,
  lastRoundWinner: null,
  draw: false,
  knight: {
    hp: 100,
    roll: 0,
    won: false
  },
  monster: {
    hp : 100,
    roll: 0,
    won: false
  }
};

function updatePlayer(state, action) {
  console.log('updatePlayer', action.player, action.value)
  if (action.player === 'knight') {
    // store the value until we get the monster
    return {
      ...state,
      knight: {
        ...state.knight,
        roll : action.value
      }
    }
  } else {
    // see who won.

    if (state.knight.roll !== 0 && action.value !== 0) {
      // both sides have rolled.
      if (state.knight.roll > action.value) {
        // take points away from monster
        const hp = Math.max(state.monster.hp - state.knight.roll, 0)
        return {
          ...state,
          rolling: false,
          draw: false,
          gameOver: hp === 0,
          lastRoundWinner: 'knight',
          monster: {
            ...state.monster,
            roll : action.value,
            hp
          }, 
          knight: {
            ...state.knight,
            won: hp === 0
          }
        }
      } else if (action.value > state.knight.roll) {
        // take points away from player
        const hp = Math.max(state.knight.hp - action.value, 0)
        return {
          ...state,
          rolling: false,
          draw: false,
          gameOver: hp === 0,
          lastRoundWinner: 'monster',
          knight: {
            ...state.knight,
            hp
          },
          monster: {
            ...state.monster,
            won:  hp === 0
          }
        }
      } else {
        // a draw. The attack is parried
        return {
          ...state,
          rolling: false,
          draw: true,
          lastRoundWinner: null
        }
      }
    }

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
      case FIGHT:
        console.log('fighting reducer')
          return {
              ...state,
              rolling: true
          };

      case SETVALUE:
        console.log('setting value ', action)
          return updatePlayer(state, {
            player: action.payload.player,
            value: action.payload.value
          });

      case RESTART: 
          return initialState;

      default:
          return state;
  }
}