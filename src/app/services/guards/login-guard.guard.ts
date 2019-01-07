import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate() {
    if (this._usuarioService.alredyLogin()) {
      return true;
    } else {
      console.log('Guard blocked');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
