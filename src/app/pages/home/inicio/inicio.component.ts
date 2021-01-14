/* ANGULAR */
import { Component, OnInit, AfterViewInit } from '@angular/core';

/* INTERNO */
import { UtilsService } from 'src/app/shared/services/utils.service';

/* TERCEIROS */
import { ToastrService } from 'ngx-toastr';

declare let $: any;

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, AfterViewInit {

  constructor(
    private utilsService: UtilsService,
    private toastr: ToastrService,
  ) { }

  // Variáveis auxiliares
  dataAtual = new Date();

  // Input de histório
  Inputdata: string = this.utilsService.tratarData(this.dataAtual);

  async ngOnInit(): Promise<void> {

  }

  ngAfterViewInit(): void {
  }

  abrirHistorico(arg) {
    var data = arg.dateStr + " 00:00:00"
    this.Inputdata = data;
    $('#modalHistorico').modal('show');
  }

}
