import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { Item } from '../store/carts/state';
import { provideMockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { findComponent, expectText, findEl,findComponents } from '../spec-helpers/element.spec-helper';
import { removePlayer } from '../store/carts/action';


fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store$: Store<Item[]>;
  let itemPlayer: DebugElement;
  let listPlayer: DebugElement[];

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
  }

  fdescribe('with initial state', () => {
    const initailState:Item[]=  []
    beforeEach(async () => {
      await setup({ cart: initailState });
    });
    it('not found app item player cart',()=>{
        expect(()=>{
          findComponent(fixture, 'app-item-player-cart')
        }).toThrow();
    })
    it('show zero total',()=>{
      expectText(fixture, 'total',`total : ฿0.00`);
    })

  })

  fdescribe('with cart', () => {
    const count = 2
    const cart = [
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
      await setup({cart:cart});
      itemPlayer = findComponent(fixture, 'app-item-player-cart');
      listPlayer = findComponents(fixture, 'app-item-player-cart');
    });

    it('renders list cart', () => {
      expect(cart.length).toBe(listPlayer.length);

      cart.forEach((item,index)=>{
        expect(listPlayer[index].properties.count).toBe(item.count);
        expect(listPlayer[index].properties.player).toEqual(item.player);
      })
    });

    it('show total', async ()=>{
      expectText(fixture, 'total',`total : ฿600.00`);
    })

    it('remove player', ()=>{
      listPlayer[0].triggerEventHandler('removePlayer',cart[0].player.id);
      expect(store$.dispatch).toHaveBeenCalledWith(removePlayer({ playerId:cart[0].player.id }));
    })

  });
});
