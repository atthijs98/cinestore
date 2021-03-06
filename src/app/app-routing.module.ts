import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {LoginComponent} from './components/login/login.component';
import {ProductsComponent} from './components/product/products.component';
import {SignupComponent} from './components/signup/signup.component';
import {ContactComponent} from './components/contact/contact.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProductStartComponent} from './components/product/product-start/product-start.component';
import {ProductEditComponent} from './components/product/product-edit/product-edit.component';
import {ProductDetailComponent} from './components/product/product-detail/product-detail.component';
import {ShoppingListComponent} from './components/shopping-list/shopping-list.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'product', component: ProductsComponent, canActivate: [AuthGuard], children: [
      {path: '', component: ProductStartComponent },
      {path: 'new', component: ProductEditComponent},
      {path: ':id', component: ProductDetailComponent},
      {path: ':id/edit', component: ProductEditComponent}
   ]},
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


