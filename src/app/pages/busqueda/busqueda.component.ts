import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
  }
  buscar(termino: string) {
    const url = environment.apiUrl + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      if (resp.ok) {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
        console.log(resp);
      }
    });
  }
}
