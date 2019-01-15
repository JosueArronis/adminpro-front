import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ROUTES
import { APP_ROUTES } from './app.routes';

// MODULES
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Services
import { ServiceModule } from './services/service.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
