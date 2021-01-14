import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/inicial/login/login.component';
import { NovaSenhaComponent } from './pages/inicial/nova-senha/nova-senha.component'
import { InicialModule } from './pages/inicial/inicial.module';

import { RequestInterceptor } from './shared/services/request-interceptor.service';
import { LoginGuard } from './shared/services/guard/login.guard';
import { AuthGuard } from './shared/services/guard/auth.guard';
import { LoadingModule } from './shared/components/loading/loading.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { ComponentsModule } from './shared/components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    LoadingModule,
    ComponentsModule,
    InicialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoginGuard]
      },
      {
        path: 'primeiro-acesso',
        component: NovaSenhaComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'painel',
        loadChildren: './pages/nav-menu/nav-menu.module#NavMenuModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'not-authorized',
        component: UnauthorizedComponent
      },
      {
        path: '**',
        redirectTo: 'not-found'
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
