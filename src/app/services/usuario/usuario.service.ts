import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadFromStorage();
   }

  loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token  = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else  {
      this.token = '';
      this.usuario = null;
    }
  }

  alredyLogin() {
    return (this.token.length > 0 ) ? true : false;
  }

  saveUserStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  loginGoogle (token: string) {
    const url = environment.apiUrl + '/login/google';
    return this.http.post(url, {token})
    .map( (resp: any) => {
      this.saveUserStorage(resp.id, resp.token, resp.usuario);
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
             this.saveUserStorage(resp.id, resp.token, resp.usuario);
              return true;
           });
  }
  crearUsuario (usuario: Usuario) {
    const url = environment.apiUrl + '/usuario';
    return this.http.post(url, usuario)
          .map((resp: any) => {
            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          });
  }
}
