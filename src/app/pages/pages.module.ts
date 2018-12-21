import { NgModule } from '@angular/core';

// ROUTES
import { PAGES_ROUTES } from './pages.routes';

// MODULES
import { SharedModule } from '../shared/shared.module';
import {FormsModule} from '@angular/forms';



import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        AccountSettingsComponent,
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ]
})
export class PagesModule { }
