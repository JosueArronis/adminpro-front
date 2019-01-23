import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(desde: number = 0) {
    const url = environment.apiUrl + '/medico?desde=' + desde;
    return this.http.get(url);
  }
  buscarMedicos(termino: string) {
    const url = environment.apiUrl + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).map((resp: any) => resp.medicos);
  }
  borrarMedico(id: string) {
    const url =  environment.apiUrl + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url).map((resp: any) => {
      swal('Medico Borrado', 'El medico fue borrado correctamente', 'success');
      return resp;
    });
  }
  guardarMedico(medico: Medico) {
    let url = environment.apiUrl + '/medico';

    if (medico._id) {
      // actualizando
      url += '/' + medico._id + '?token=' + this._usuarioService.token;
      return this.http.put(url, medico).map((resp: any) => {
        swal('Medico Actualizado', medico.nombre, 'success');
        return resp.medico;
      });
    } else {
      // creando
      url +=  '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).map((resp: any) => {
        swal('Medico Creado', medico.nombre, 'success');
        return resp.medico;
      });
    }
  }
  cargarMedico(id: string) {
    const url = environment.apiUrl + '/medico/' + id ;
    return this.http.get(url).map((resp: any) => {
      return resp.medico;
    });
  }
}
