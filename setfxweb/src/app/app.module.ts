import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialAppModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './core/components/page404/page404.component';
import { QueryokComponent } from './core/components/queryok/queryok.component';
import { ServiceStatusComponent } from './core/components/servicestatus/servicestatus.component';
import { DetailSetFxComponent } from './core/components/detailsetfx/detailsetfx.component';
import { NavbarComponent } from './core/template/navbar/navbar.component';
import { FooterComponent } from './core/template/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MessageAlertComponent } from './core/components/message/message.component';


///// Services
import { ConfigappService } from "./core/services/configapp.service";
import { AuthGuard } from './core/guard/auth.guard';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { ErrorinterceptorService } from './core/services/errorinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    QueryokComponent,
    ServiceStatusComponent,
    DetailSetFxComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MessageAlertComponent
  ],
  entryComponents: [MessageAlertComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialAppModule
  ],
  providers: [ConfigappService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorinterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
