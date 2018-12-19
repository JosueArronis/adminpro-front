import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;
  // tslint:disable-next-line:no-input-rename
  @Input('Nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onChange(newValue: number) {
    // const elemHTML: any = document.getElementsByName('progreso')[0];
    if (newValue >= 100) {
      this.progreso  = 100;
    } else if (newValue <= 0 ) {
      this.progreso = 0;
    } else  {
      this.progreso = newValue;
    }
    this.txtProgress.nativeElement.value = Number(this.progreso);
    this.cambioValor.emit(this.progreso);
  }
  cambiarvalor(valor, plus) {
    if (this.progreso >= 100 && plus) {
      return;
    }
    if (this.progreso <= 0 && !plus) {
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
