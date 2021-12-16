import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { players } from '../data';
import { removePlayer } from '../store/carts/action';
import { Item } from '../store/carts/state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$: Observable<Item[]>;
  players = players;
  totalValue!: number;

  constructor(private store: Store<{ cart: Item[] }>) { 
    this.cart$ = this.store.select("cart"); 
    this.cart$.subscribe(cart=>{
      this.totalValue = cart.reduce((total,item)=>{
        return total+(item.count*item.player.value);
      },0);
    })
  }

  ngOnInit(): void {
  }

  onRemovePlayer(playerId: number): void {
    this.store.dispatch(removePlayer({playerId}));
  }

}
