import {
  FIGHT,
  SETVALUE,
  RESTART,
  KNIGHT_MULTIPLIER,
  MONSTER_MULTIPLIER, 
  KNIGHT, 
  MONSTER
} from '../constants';

const initialState = {
  rolling: false,
  gameOver: false,
  lastRoundWinner: null,
  lastPoints: 0,
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
  if (action.player === KNIGHT) {
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
        const difference = state.knight.roll - action.value;
        const hp = Math.max(state.monster.hp - (difference * MONSTER_MULTIPLIER), 0)
        return {
          ...state,
          rolling: false,
          draw: false,
          gameOver: hp === 0,
          lastRoundWinner: KNIGHT,
          lastPoints: difference,
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
        const difference = action.value - state.knight.roll;
        const hp = Math.max(state.knight.hp - (difference * KNIGHT_MULTIPLIER), 0)
        return {
          ...state,
          rolling: false,
          draw: false,
          gameOver: hp === 0,
          lastRoundWinner: MONSTER,
          lastPoints: difference,
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
          lastRoundWinner: null,
          lastPoints: 0
        }
      }
    }

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
      case FIGHT:
          return {
              ...state,
              rolling: true
          };

      case SETVALUE:
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