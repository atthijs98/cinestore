import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app-component/app.component';
import {HeaderComponent} from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/Products/products.component';
import { ProductItemComponent } from './components/Products/product-list/product-item/product-item.component';
import { ProductEditComponent } from './components/Products/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/Products/product-detail/product-detail.component';
import { ProductStartComponent } from './components/Products/product-start/product-start.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import {ShoppingListService} from './components/shopping-list/shopping-list.service';
import {ProductListComponent} from './components/Products/product-list/product-list.component';
import {ProductService} from './components/Products/product.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductDirectorService} from './services/product-director.service';
import {ProductImageService} from './services/product-image.service';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import {JwtService} from './services/jwt.service';
import {LocalStorageService} from './services/local-storage.service';
import {AuthenticatedModule} from './authenticated/authenticated.module';
import {GeneralStateService} from './services/general-state.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    path: 'signup',
    component: SignupComponent
  }
];

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
    AuthenticatedModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ShoppingListService,
    ProductService,
    ProductDirectorService,
    ProductImageService,
    JwtService,
    LocalStorageService,
    GeneralStateService,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
