import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, expectText, findEl, findEls } from '../spec-helpers/element.spec-helper';
import { CurrencyPipe } from '@angular/common';

import { ShoppingComponent } from './shopping.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlayerService } from '../player.service';
import { Store } from '@ngrx/store';
import { Item } from '../store/carts/state';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { addPlayer } from '../store/carts/action';

fdescribe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;
  let fakePlayerService: PlayerService;
  let store$: Store<Item[]>;

  const player = {
    id:1,
    name:"messi",
    value:200
  }

  const currencyPipe = new CurrencyPipe("en")
  
  const setup = async (
    state: { cart: Item[] },
    playerServiceReturnValues?:
      jasmine.SpyObjMethodNames<PlayerService>
  ) => {
    fakePlayerService = jasmine.createSpyObj<PlayerService>(
      'PlayerService',
      {
        getPlayers: of([]),
        createPlayer: undefined,
        ...playerServiceReturnValues,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ ShoppingComponent ],
      providers:  [
        { provide: PlayerService, useValue: fakePlayerService },
        provideMockStore({ initialState: state })
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch');

    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  fit('should create', async () => {
    await setup({cart:[]});
    expect(component).toBeTruthy();
  });

  fit('renders with empty player',async ()=>{
    await setup({cart:[]},{
      getPlayers:of([])
    });
    const playerListElm = findEls(fixture,"itemPlayer")
    expect(playerListElm.length).toBe(0);
  })

  fit('renders list player', async ()=>{
    const players = [
      {
        id:1,
        name:"John",
        value:123
      },
      {
        id:2,
        name:"Bob",
        value:123
      }
    ]
    await setup({cart:[]},{
      getPlayers: of(players)
    })
    const playerListElm = findEls(fixture,"itemPlayer")
    expect(playerListElm.length).toBe(players.length);

    const nameEls = findEls(fixture,"name")
    const valueEls = findEls(fixture,"value")

    players.forEach((player,index)=>{
      expect(player.name).toContain(nameEls[index].nativeElement.innerHTML)
      expect(currencyPipe.transform(player.value.toString(),"THB","symbol-narrow")).toContain(valueEls[index].nativeElement.innerHTML)
    })
  })

  fit('add player',async ()=>{
    await setup({cart:[]},{
      getPlayers: of([player])
    })

    const btnAddPlayerElm = findEl(fixture,"addPlayer")
    btnAddPlayerElm.triggerEventHandler('click',player);
    expect(store$.dispatch).toHaveBeenCalledWith(addPlayer({player}))
  })

});
