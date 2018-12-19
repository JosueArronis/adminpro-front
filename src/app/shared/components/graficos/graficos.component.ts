import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styles: []
})
export class GraficosComponent implements OnInit {

  @Input() doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: number[] = [350, 450, 100];
  @Input() doughnutChartType: string = 'doughnut';
  @Input() Leyenda: string = 'Leyenda';
  constructor() { }

  ngOnInit() {
  }

}
