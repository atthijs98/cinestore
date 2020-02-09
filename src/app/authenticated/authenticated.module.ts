import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthenticatedRoutingModule} from './authenticated-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticatedModule {

}
