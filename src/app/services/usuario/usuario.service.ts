import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';
import { UploadFilesService } from '../uploadFiles/upload-files.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFilesService
  ) {
    this.loadFromStorage();
   }

  loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token  = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else  {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  alredyLogin() {
    return (this.token.length > 0 ) ? true : false;
  }

  saveUserStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle (token: string) {
    const url = environment.apiUrl + '/login/google';
    return this.http.post(url, {token})
    .map( (resp: any) => {
      this.saveUserStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = environment.apiUrl + '/login';
    return this.http.post(url, usuario)
           .map((resp: any) => {
             this.saveUserStorage(resp.id, resp.token, resp.usuario, resp.menu);
              return true;
           })
           .catch(err => {
             swal('Error en el login', err.error.mensaje, 'error');
             return throwError(err);
           });
  }
  crearUsuario (usuario: Usuario) {
    const url = environment.apiUrl + '/usuario';
    return this.http.post(url, usuario)
          .map((resp: any) => {
            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          })
          .catch(err => {
             swal(err.error.mensaje, err.error.errors.message, 'error');
             return throwError(err);
           });
  }
  actualizarUsuario(usuario: Usuario) {
    const url = environment.apiUrl + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).map((resp: any) => {
      if (usuario._id === this.usuario._id) {
        this.saveUserStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    })
    .catch(err => {
             swal(err.error.mensaje, err.error.errors.message, 'error');
             return throwError(err);
           });
  }
  changeImg( file: File, id: string) {
    this._uploadFileService.uploadFile(file, 'usuarios', id).then( (resp: any) => {
     this.usuario.img = resp.usuario.img;
     this.saveUserStorage(id, this.token, this.usuario, this.menu);
     swal('Imagen actualizada', this.usuario.nombre, 'success');
    })
    .catch( resp => {
      console.log(resp);
    });
  }
  cargarUsuarios(desde: number = 0) {
    const url = environment.apiUrl + '/usuario?desde=' + desde;
    return this.http.get(url);
  }
  buscarUsuarios(termino: string) {
    const url = environment.apiUrl + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).map((resp: any) =>  resp.usuarios);
  }
  borrarUsuario(id: string) {
    const url = environment.apiUrl + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal('Usuario borrado', 'Usuario borrado correctamente', 'success');
      return true;
    });
  }
}
