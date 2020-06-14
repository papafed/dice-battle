// All constants live here

export const DICE_SIDES = 6;
export const KNIGHT_HP = 100;
export const MONSTER_HP = 100;
export const KNIGHT_MULTIPLIER = 1;
export const MONSTER_MULTIPLIER = 1;
export const MAX_MONSTERS = 3;
export const MAX_KNIGHTS = 2;

export const FIGHT = 'FIGHT';
export const SETVALUE = 'SETVALUE';
export const RESTART = 'RESTART';
export const RUNAWAY = 'RUNAWAY';

export const COMMENTARY = {
  knight : 'You hit the monster for #score',
  monster : 'The monster swipes you for #score',
  draw: `You successfully defend each other's attacks`,
  gameOver: 'Game Over'
}

export const KNIGHT_SPEECH = {
  won: ['Have at you, foul beast!', 'Take that!', 'A ha! Not so fierce now!'],
  lost: 'Ouch!',
  victory: 'Hurrah, I have vanquished the monster!'
}

export const MONSTER_SPEECH = {
  won: ['Monsters gonna monst.', 'Thou thinkest thou can beat me?', 'Die, puny human!'],
  lost: 'Ouch!',
  victory: 'Thou really ought to give up this adventuring lark.'
}