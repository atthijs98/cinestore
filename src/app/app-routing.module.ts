// import {NgModule} from '@angular/core';
// import {Routes, RouterModule} from '@angular/router';
//
//
// import {LoginComponent} from './components/login/login.component';
// import {ProductsComponent} from './components/Products/products.component';
// import {SignupComponent} from './components/signup/signup.component';
// import {ContactComponent} from './components/contact/contact.component';
// import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
// import {AppComponent} from './app-component/app.component';
// import { ProductStartComponent } from './components/Products/product-start/product-start.component';
// import { ProductEditComponent } from './components/Products/product-edit/product-edit.component';
// import { ProductDetailComponent } from './components/Products/product-detail/product-detail.component';
// import {ShoppingListComponent} from './components/shopping-list/shopping-list.component';
// import {AuthGuard} from './auth/auth.guard';
//
// const routes: Routes = [
//   {path: '', redirectTo: '/login', pathMatch: 'full'},
//   {path: 'login', component: LoginComponent},
//   {path: 'signup', component: SignupComponent},
//   {path: 'product', component: ProductsComponent, canActivate: [AuthGuard], children: [
//       {path: '', component: ProductStartComponent },
//       {path: 'new', component: ProductEditComponent},
//       {path: ':id', component: ProductDetailComponent},
//       {path: ':id/edit', component: ProductEditComponent}
//    ]},
//   {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
//   {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
//   {path: 'not-found', component: PageNotFoundComponent},
//   {path: '**', redirectTo: '/not-found', pathMatch: 'full'},
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes, {useHash: true})],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
//
