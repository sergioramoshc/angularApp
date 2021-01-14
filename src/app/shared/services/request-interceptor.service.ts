/* ANGULAR */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

/* INTERNO */
import { environment } from 'src/environments/environment';
import { MdlLogin } from '../../models/MdlLogin';
import { LoginStore } from '../../stores/login.store';
import { UserService } from './user.service';

/* TERCEIROS */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

const URL_API = environment.ApiUrl;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  // Classe responsável por interceptar todas as requisições e verificar se o token está expirado
  // Caso esteja, enviar para a tela de não autorizado, senão atualiza o token no servidor

  constructor(
    private userService: UserService,
    private loginStore: LoginStore,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    if (!req.headers.has('Accept')) {
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }

    const token = this.userService.getTokenKey();

    //clonando a requisição e setando o header com o token
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    //verificando erros do retorno 401 (não autotizado) para fazer ou não uma nova requisição
    return next.handle(req)
      .pipe(catchError(async (error) => {
        console.log(error);
        switch (error.status) {
          case 400:
            return new HttpResponse({status: 400, statusText: "Erro de validação."});
          case 401:
            var autenticacao = new MdlLogin();
            autenticacao.user = this.userService.getUserKey();
            autenticacao.password = "string";
            autenticacao.refreshToken = this.userService.getRefreshTokenKey();
            autenticacao.grantType = "refresh_token";

            //refazendo a requisição para o refresh token
            var responseLogin = await this.loginStore.postLogin(autenticacao);

            if (responseLogin.status == 200) {
              //criando e emitindo uma nova requisição requisição com os dados do token atualizado
              const cloneReq = req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.userService.getTokenKey()) });
              return next.handle(cloneReq);
            } else {
              this.userService.limpaKeys();
              this.toastr.error("Sessão expirada.");
              this.router.navigate(['']);
              throw error;
            }
          case 500:
            return new HttpResponse({status: 500, statusText: "Falha temporária, tente novamente em breve."});
        }
      })) as Observable<HttpEvent<any>>;
  }
}
