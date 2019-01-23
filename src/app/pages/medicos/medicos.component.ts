import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
declare var swal: any;
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
   public _medicoServices: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
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
    this.cargarMedicos();
  }
  cargarMedicos() {
    this.cargando = true;
    this._medicoServices
      .cargarMedicos(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
        this.cargando = false;
      });
  }
  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.desde = 0;
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this._medicoServices
      .buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.cargando = false;
      });
  }
  borrarMedico(medico: Medico) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta apunto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicoServices.borrarMedico(medico._id).subscribe((resp: any) => {
          this.cargarMedicos();
        });
      }
    });
  }
}
