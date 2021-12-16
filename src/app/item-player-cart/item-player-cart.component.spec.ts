import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPlayerCartComponent } from './item-player-cart.component';

describe('ItemPlayerCartComponent', () => {
  let component: ItemPlayerCartComponent;
  let fixture: ComponentFixture<ItemPlayerCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPlayerCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPlayerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
