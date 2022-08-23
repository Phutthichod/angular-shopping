import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { Item } from '../store/carts/state';
import { provideMockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { findComponent, expectText, findEl } from '../spec-helpers/element.spec-helper';
import { Player } from "src/app/data";


fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store$: Store<Item[]>;
  let itemPlayer: DebugElement;

  async function setup(state: { cart: Item[] }): Promise<void> {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [provideMockStore({ initialState: state })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch');

    fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();

    itemPlayer = findComponent(fixture, 'app-item-player-cart');
  }

  fdescribe('initial state', () => {
    const count = 2
    const initailState = [
      {
        player:{
            id:1,
            name:"messi",
            value:200
        },count:count,
     },
     {
      player:{
          id:2,
          name:"ronaldo",
          value:100
      },count:count,
   }
    ]
    beforeEach(async () => {
      await setup({cart:initailState});
    });

    it('renders list cart', () => {
      expect(itemPlayer).toBeTruthy();
      expect(itemPlayer.properties.count).toBe(initailState[0].count);
      expect(itemPlayer.properties.player).toEqual(initailState[0].player);
    });

    it('show total', async ()=>{
      expectText(fixture, 'total',`total : ฿600.00`);
    })

  });
});
