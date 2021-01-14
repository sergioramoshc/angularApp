/* ANGULAR */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* INTERNO */
import { InicioComponent } from './inicio/inicio.component';
import { HistoricoComponent } from './inicio/modal-historico/modal-historico.component';

/* TERCEIROS */

@NgModule({
  declarations: [
    InicioComponent,
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule {
}
