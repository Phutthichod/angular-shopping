import { CommonModule,Location } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { expectText, findEl } from '../spec-helpers/element.spec-helper';
import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';
import { Item } from '../store/carts/state';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store$: Store<Item[]>;

  @Component({
    template: ''
  })
  class DummyComponent {
  }

  const setup = async (state:{ cart: Item[] }) => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
         { path: '', component: DummyComponent },
         { path: 'cart', component: DummyComponent },
         { path: 'add', component: DummyComponent }
        ])
      ],
      declarations: [ HeaderComponent,DummyComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideMockStore({ initialState: state })],
    })
    .compileComponents();

    store$ = TestBed.inject(Store);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  
  fit('should create', async () => {
    await setup({cart:[]})
    expect(component).toBeTruthy();
  });

  fit('link to home', async () => {
    await setup({cart:[]})
    let href = findEl(fixture, 'linkToHome').nativeElement.getAttribute('href');
    expect(href).toEqual('/');
  });

  fit('link to add player page',async () => {
    await setup({cart:[]})
    let href = findEl(fixture, 'linkToAddPlayer').nativeElement.getAttribute('href');
    expect(href).toEqual('/add');
  });

  fit('link to cart page',async () => {
    await setup({cart:[]})
    let href = findEl(fixture, 'linkToAddCart').nativeElement.getAttribute('href');
    expect(href).toEqual('/cart');
  });

  fit('show cart length when empty',async ()=>{
    await setup({cart:[]})
    expectText(fixture, 'cartLength',"0")
  })

  fit('show cart length with cart data',async ()=>{
    const state: Item[]= [
      { 
        player:{
          id:1,
          name:"test",
          value:123
        },
        count:123
      },
      { 
        player:{
          id:1,
          name:"test",
          value:123
        },
        count:123
      },
      { 
        player:{
          id:1,
          name:"test",
          value:123
        },
        count:123
      }
    ]
    await setup({cart:state})
    expectText(fixture, 'cartLength',state.length.toString())
  })
});
