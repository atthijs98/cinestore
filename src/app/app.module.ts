import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductService} from './products/product.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductDirectorService} from './shared/product-director.service';
import {ProductImageService} from './shared/product-image.service';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductStartComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ProductListComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, ProductService, ProductDirectorService, ProductImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
