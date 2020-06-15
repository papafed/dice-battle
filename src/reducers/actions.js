import {
  FIGHT,
  SETVALUE,
  RESTART
} from '../constants';

export const fight = () => {
  return dispatch => {
      dispatch({ type: FIGHT })
  }
}

export const restart = () => {
  return dispatch => {
      dispatch({ type: RESTART })
  }
}

export const setValue = (value, player) => {
  return dispatch => {
      dispatch({ type: SETVALUE, payload: {value, player }})
  }
}