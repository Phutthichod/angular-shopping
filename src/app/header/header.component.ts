import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../store/carts/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$: Observable<Item[]>;
  cartLenght!: number;
  constructor(private store: Store<{ cart: Item[] }>) {
    this.cart$ = store.select('cart');
    this.cart$.subscribe(cart=>{
      this.cartLenght = cart.length
    })
   }

  ngOnInit(): void {
  }

}
