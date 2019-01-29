import {RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: PagesComponent, canActivate: [LoginGuardGuard], loadChildren: './pages/pages.module#PagesModule'},
    {path: '**', component: NoPageFoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
