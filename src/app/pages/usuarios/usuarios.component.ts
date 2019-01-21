import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../shared/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadServices: ModalUploadService
    ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadServices.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }
  mostralModal(id: string) {
    this._modalUploadServices.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.desde = 0;
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Esta seguro?',
      text: 'Esta apunto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(resp => {
          console.log(resp);
          this.cargarUsuarios();
        });
      }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
