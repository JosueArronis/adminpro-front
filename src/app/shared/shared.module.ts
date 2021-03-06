import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { RouterModule } from '@angular/router';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';


@NgModule({
  imports: [CommonModule, FormsModule, ChartsModule, RouterModule, PipesModule],
  declarations: [
    NoPageFoundComponent,
    SidebarComponent,
    BreadcrumsComponent,
    HeaderComponent,
    IncrementadorComponent,
    GraficosComponent,
    ModalUploadComponent
  ],
  exports: [
    NoPageFoundComponent,
    SidebarComponent,
    BreadcrumsComponent,
    HeaderComponent,
    IncrementadorComponent,
    GraficosComponent,
    ModalUploadComponent
  ]
})
export class SharedModule {}
