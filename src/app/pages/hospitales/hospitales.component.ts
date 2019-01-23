import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../shared/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
    public _hospitalServices: HospitalService,
    public _modalUploadServices: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadServices.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }
  cargarHospitales() {
    this.cargando = true;
    this._hospitalServices
      .cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
  }
  crearHospital() {
    swal({
      title: 'Nuevo Hospital',
      text: 'Escriba el nombre del nuevo hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((value: string) => {
      if (value === null) {
        return;
      }
      if (value.length <= 4) {
        swal(
          'Nombre Invalido',
          'El nombre del hospital debe contener mas de 4 letras',
          'warning'
        );
        return;
      }
      this._hospitalServices.crearHospital(value).subscribe((resp: any) => {
        if (resp.ok) {
          this.cargarHospitales();
        }
      });
    });
  }
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.desde = 0;
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalServices
      .buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }
  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta apunto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalServices.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    });
  }
  actualizarHospital(hospital: Hospital) {
    this._hospitalServices
      .actualizarHospital(hospital)
      .subscribe((resp: any) => {});
  }
  mostralModal(id: string) {
    this._modalUploadServices.mostrarModal('hospitales', id);
  }
}
