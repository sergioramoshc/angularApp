/* ANGULAR */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* INTERNO */
import { NavMenuComponent } from './nav-menu.component';
import { InicioComponent } from '../home/inicio/inicio.component';
import { HomeModule } from '../home/home.module';

/* TERCEIROS */

@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: NavMenuComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'inicio'
          }, {
            path: 'inicio',
            component: InicioComponent
          }
        ]
      }
    ]),
  ],
  bootstrap: [NavMenuComponent]
})
export class NavMenuModule { }
