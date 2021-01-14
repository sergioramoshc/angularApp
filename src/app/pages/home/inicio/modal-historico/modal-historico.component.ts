/* ANGULAR */
import { Component, Input, OnChanges } from '@angular/core';

/* INTERNO */
import { UtilsService } from 'src/app/shared/services/utils.service';

/* TERCEIROS */

declare let $: any;

@Component({
  selector: 'modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.css'],
})
export class HistoricoComponent implements OnChanges {

  constructor(
    private utilsService: UtilsService,
  ) { }

  // Variáveis do componente geral
  @Input() data: string = this.utilsService.tratarData(new Date());
  headerHistorico: string;

  async ngOnChanges() {
    this.tratarHeaderHistorico(this.data);
  }

  tratarHeaderHistorico(data: string) {
    // Separa a data em ano - 0/mes - 1/dia - 2
    let dataParts = data.replace(" 00:00:00", "").split("-");

    let mes: string;
    switch (dataParts[1]) {
      case "01":
        mes = "jan.";
        break;
      case "02":
        mes = "fev.";
        break;
      case "03":
        mes = "mar.";
        break;
      case "04":
        mes = "abr.";
        break;
      case "05":
        mes = "mai.";
        break;
      case "06":
        mes = "jun.";
        break;
      case "07":
        mes = "jul.";
        break;
      case "08":
        mes = "ago.";
        break;
      case "09":
        mes = "set.";
        break;
      case "10":
        mes = "out.";
        break;
      case "11":
        mes = "nov.";
        break;
      case "12":
        mes = "dez.";
        break;
    }

    this.headerHistorico = dataParts[2] + " de " + mes + " de " + dataParts[0];
  }
}
