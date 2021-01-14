/* ANGULAR */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* INTERNO */
import { LoginComponent } from './login/login.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';

/* TERCEIROS */


@NgModule({
  declarations: [
    LoginComponent,
    NovaSenhaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [],
  providers: []
})
export class InicialModule {
}
