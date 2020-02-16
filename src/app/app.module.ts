import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app-component/app.component';
import {HeaderComponent} from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/product/products.component';
import { ProductItemComponent } from './components/product/product-list/product-item/product-item.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductStartComponent } from './components/product/product-start/product-start.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import {ShoppingListService} from './components/shopping-list/shopping-list.service';
import {ProductListComponent} from './components/product/product-list/product-list.component';
import {ProductService} from './components/product/product.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import {JwtService} from './services/jwt.service';
import {LocalStorageService} from './services/local-storage.service';
import {GeneralStateService} from './services/general-state.service';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingListComponent,
    ProductStartComponent,
    ProductEditComponent,
    ShoppingEditComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductListComponent,
    ContactComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ShoppingListService,
    ProductService,
    JwtService,
    LocalStorageService,
    GeneralStateService,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
