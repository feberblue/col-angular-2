import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { Page404Component } from './core/components/page404/page404.component';
import { QueryokComponent } from './core/components/queryok/queryok.component';

import { ServiceStatusComponent } from './core/components/servicestatus/servicestatus.component';
import { DetailSetFxComponent } from './core/components/detailsetfx/detailsetfx.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'swap', component: QueryokComponent, canActivate: [AuthGuard] },
  { path: 'status', component: ServiceStatusComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DetailSetFxComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }