import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth/auth.guard';
import {HomeComponent} from '../components/home/home.component';
import {ProductsComponent} from '../components/Products/products.component';
import {ProductStartComponent} from '../components/Products/product-start/product-start.component';
import {ProductEditComponent} from '../components/Products/product-edit/product-edit.component';
import {ProductDetailComponent} from '../components/Products/product-detail/product-detail.component';
import {ShoppingListComponent} from '../components/shopping-list/shopping-list.component';
import {ContactComponent} from '../components/contact/contact.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';

const authenticatedRoutes: Routes = [
  {
    path: 'me',
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'start', pathMatch: 'full'},
      {path: 'start', component: HomeComponent},
      {path: 'product', component: ProductsComponent, children: [
          {path: '', component: ProductStartComponent },
          {path: 'new', component: ProductEditComponent},
          {path: ':id', component: ProductDetailComponent},
          {path: ':id/edit', component: ProductEditComponent}
        ]},
      {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
      {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
      {path: 'not-found', component: PageNotFoundComponent},
      {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authenticatedRoutes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule {

}
