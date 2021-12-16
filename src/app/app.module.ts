import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { FormPlayerComponent } from './form-player/form-player.component';
import { CartComponent } from './cart/cart.component';
import { ItemPlayerCartComponent } from './item-player-cart/item-player-cart.component';
import { DataService } from './data.service';

import { StoreModule } from '@ngrx/store';
import { CartReducer } from './store/carts/reducer';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    FormPlayerComponent,
    CartComponent,
    ItemPlayerCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    StoreModule.forRoot({ cart: CartReducer }),
    RouterModule.forRoot([
      {path: '', component: ShoppingComponent},
      {path: 'add', component: FormPlayerComponent},
      {path: 'cart', component: CartComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
