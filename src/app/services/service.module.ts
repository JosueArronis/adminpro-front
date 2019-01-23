import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../shared/components/modal-upload/modal-upload.service';
// Servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  UploadFilesService,
  HospitalService,
  MedicoService
 } from './service.index';


@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    UploadFilesService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule {}
