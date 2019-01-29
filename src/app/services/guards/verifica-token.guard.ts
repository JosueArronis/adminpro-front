import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor (
    public _usuariosService: UsuarioService,
    public router: Router
  ) {}
  canActivate(): Promise<boolean> | boolean {
    const token  = this._usuariosService.token;
    // atob descodifica una cadena de datos que ha sido codificada usando  base-64.
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }
  expirado(fechaExp: number) {
    const now = new Date().getTime() / 1000;
    if  ( fechaExp < now) {
      return true;
    } else  {
      return false;
    }
  }
  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      const tokenExp  = new Date( fechaExp * 1000);
      const now  = new Date();
      now.setTime(now.getTime() + (4 * 60 * 60 * 1000 ));
      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else  {
        this._usuariosService.refreshToken().subscribe(resp => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }
    });
  }
}
