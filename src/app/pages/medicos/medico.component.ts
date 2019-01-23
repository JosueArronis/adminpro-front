import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../shared/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico =  new Medico('', '', '', {'img': '', 'nombre': '', 'usuario': ''}, '' );
  hospital: Hospital = new Hospital('');
  constructor(
    public _medicoServices: MedicoService,
    public _hospitalServices: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadServices: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._modalUploadServices.notificacion.subscribe((resp: any) => {
      console.log(resp);
      this.medico.img = resp.medico.img;
    });
    this._hospitalServices.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }
  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._medicoServices.guardarMedico(this.medico).subscribe(medico => {
     this.medico._id = medico._id;
     this.router.navigate(['/medico', medico._id]);
    });
  }
  cambioHospital(id) {
    this._hospitalServices.obtenerHospital(id).subscribe(hospital => this.hospital = hospital);
  }
  cargarMedico(id: string) {
    this._medicoServices.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital_id = medico.hospital._id;
      this.cambioHospital(this.medico.hospital_id);
    });
  }
  cambiarFoto() {
    this._modalUploadServices.mostrarModal('medicos', this.medico._id);
  }
}
