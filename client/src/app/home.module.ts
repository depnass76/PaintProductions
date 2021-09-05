import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './store/home.component';
import { Store } from './services/store.service';
import ProductListView from './views/productListView.component';
import CartView from './views/cartView.component';
import router from './router';
import { shopPage } from './pages/shopPage.component';
import { CheckoutPage} from './pages/checkout.component';
import LoginPage from './pages/LoginPage.component';
import AuthActivator from './services/authActivator.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
        AppComponent,
        ProductListView,
        CartView, 
        shopPage,
        CheckoutPage,
        LoginPage
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      router,
      FormsModule
  ],
    providers: [
        Store,
        AuthActivator
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
