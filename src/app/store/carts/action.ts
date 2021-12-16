import { createAction, props } from '@ngrx/store';
import { Item } from './state';
import { Player } from '../../data';
 
export const addPlayer = createAction(
    '[PLayer List] Add Player',
    props<{ player: Player }>()
);

export const getCart = createAction(
    '[ItemCart List] List ItemCart'
);

export const removePlayer = createAction(
    '[Player List] Remove player',
    props<{ playerId: number}>()
);