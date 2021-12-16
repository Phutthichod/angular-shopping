import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../data';
import { Store } from '@ngrx/store';
import { Item } from '../store/carts/state';
import { addPlayer } from '../store/carts/action';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  players!:Player[];
  constructor(private playerService:PlayerService,private store: Store<{ cart: Item[]}>) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(players => this.players = players);
  }

  addPlayer(player: Player): void {
    console.log(player)
    this.store.dispatch(addPlayer({player}))
  }

}
