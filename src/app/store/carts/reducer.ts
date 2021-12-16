import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';

import * as cartAction from './action';
import { Item, cartInitialState } from './state';

export const initailState: Item[] = cartInitialState;

export const CartReducer = createReducer(
    initailState,
    on(cartAction.getCart, (state)=> state),
    on(cartAction.addPlayer, (state,{player}) => {
        const playerInCart = state.filter(item=>item.player.id==player.id) 
        console.log(playerInCart)
        let newState: Item[] = [];
        if(playerInCart.length == 0) {
            newState = [...state,{
                player: player, 
                count: 1
            }];
        }else{
            newState = state.map(item=>{
                let count = item.count
                if(item.player.id == player.id){
                    count = count + 1;
                }
                return {
                    player: item.player,
                    count
                };
            })
        }
        return newState;
    }),
    on(cartAction.removePlayer, (state,{playerId})=>{
        console.log(playerId)
        return state.filter(item=> item.player.id != playerId)
    })
);