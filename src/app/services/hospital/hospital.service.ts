import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

import 'rxjs/add/operator/map';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
    ) {}

cargarHospitales(desde: number = 0) {
  const url = environment.apiUrl + '/hospital?desde=' + desde;
  return this.http.get(url);
}
obtenerHospital(id: string) {
  const url = environment.apiUrl + '/hospital/' + id;
  return this.http.get(url).map((resp: any) => resp.hospital);
}
borrarHospital(id: string) {
  const url = environment.apiUrl + '/hospital/' + id + '?token=' + this._usuarioServices.token;
  return this.http.delete(url).map(resp => {
    swal('Hospital borrado', 'Hospital borrado correctamente', 'success');
    return true;
  });
}
crearHospital(nombre: string) {
  const url = environment.apiUrl + '/hospital?token=' + this._usuarioServices.token;
  return this.http.post(url, {'nombre': nombre});
}
buscarHospital(termino: string) {
  const url = environment.apiUrl + '/busqueda/coleccion/hospitales/' + termino;
  return this.http.get(url).map((resp: any) => resp.hospitales);
}
actualizarHospital(hospital: Hospital) {
  const url = environment.apiUrl + '/hospital/' + hospital._id + '?token=' + this._usuarioServices.token;
  return this.http.put(url, {'nombre': hospital.nombre}).map((resp: any) => {
    swal('Hospital actualizado', hospital.nombre, 'success');
    return true;
  });
}
}
