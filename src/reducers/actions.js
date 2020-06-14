import {
  FIGHT,
  SETVALUE,
  RESTART,
  RUNAWAY
} from '../constants';

export const fight = () => {
  console.log('fighting')
  return dispatch => {
      dispatch({ type: FIGHT })
  }
}

export const restart = () => {
  console.log('resetting')
  return dispatch => {
      dispatch({ type: RESTART })
  }
}

export const runAway = () => {
  return dispatch => {
      dispatch({ type: RUNAWAY })
  }
}

export const setValue = (value, player) => {
  console.log('new value set', value, player)
  return dispatch => {
      dispatch({ type: SETVALUE, payload: {value, player }})
  }
}