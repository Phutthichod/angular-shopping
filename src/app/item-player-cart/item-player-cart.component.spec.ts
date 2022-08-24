import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, expectText } from '../spec-helpers/element.spec-helper';
import { CurrencyPipe } from '@angular/common';
import { ItemPlayerCartComponent } from './item-player-cart.component';

fdescribe('ItemPlayerCartComponent', () => {
  let component: ItemPlayerCartComponent;
  let fixture: ComponentFixture<ItemPlayerCartComponent>;
  const player = {
    id:1,
    name:"messi",
    value: 100,
  }
  const count = 2
  const currencyPipe = new CurrencyPipe("en") 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPlayerCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPlayerCartComponent);
    component = fixture.componentInstance;
    component.player = player
    component.count = count
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('renders item player', ()=>{
    expectText(fixture,"playerName",player.name)
    expectText(fixture,"count","จำนวน "+count.toString())
    expectText(fixture,"price","ราคา " + currencyPipe.transform(player.value.toString(),"THB","symbol-narrow"))
  })

  fit('remove player', ()=>{
    let acctualPlayerId: number | undefined
    component.removePlayer.subscribe((playerId: number)=>{
      acctualPlayerId = playerId
    })

    click(fixture,"remove")

    expect(acctualPlayerId).toBe(player.id)
  })
});
