import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  uploadImg: File;
  tempImg: any;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService
      .actualizarUsuario(this.usuario)
      .subscribe((resp: any) => {
        console.log(resp);
      });
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
  ChangeImg() {
    this._usuarioService.changeImg(this.uploadImg, this.usuario._id);
  }
}
