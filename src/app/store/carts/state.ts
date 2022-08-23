import { Player } from "src/app/data";

export interface Item {
    player: Player;
    count: number;
}


export const cartInitialState:Item[] = []
