import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NoPageFoundComponent,
    SidebarComponent,
    BreadcrumsComponent,
    HeaderComponent
  ],
  exports: [
    NoPageFoundComponent,
    SidebarComponent,
    BreadcrumsComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
