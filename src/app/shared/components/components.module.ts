import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    RouterModule
  ],
  exports: [],
  providers: []
})
export class ComponentsModule {
}
