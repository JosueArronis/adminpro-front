import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioServices: UsuarioService,
    public router: Router
  ) { }
  validSameValue(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      } else {
        return {
          noEquals: true
        };
      }
    };
  }
  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    passwordConfirm: new FormControl(null, Validators.required),
    condiciones: new FormControl(false),
    }, { validators: this.validSameValue('password', 'passwordConfirm' )});
  }
  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
    );
    this._usuarioServices.crearUsuario(usuario).subscribe( (resp: any) => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }

}
