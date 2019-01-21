import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  uploadImg: File;
  tempImg: any;
  constructor(
    public _uploadFilesService: UploadFilesService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
  }
  SelectImg(file: File) {
    if (!file) {
      this.uploadImg = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.uploadImg = null;
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }
    this.uploadImg = file;

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.tempImg = reader.result;
    };
  }
  subirImagen() {
    this._uploadFilesService.uploadFile(this.uploadImg, this._modalUploadService.tipo, this._modalUploadService.id)
      .then((resp: any) => {
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      }).catch(err => {
        console.log('Error en la cargar..' + err);
      });
  }
  cerrarModal() {
    this.tempImg = null;
    this.uploadImg = null;
    this._modalUploadService.ocultarModal();
  }
}
