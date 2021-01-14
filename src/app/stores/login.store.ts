/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

/* INTERNO */
import { QpNovaSenha } from '../models/QpNovaSenha';
import { MdlToken } from '../models/MdlToken';
import { MdlLogin } from '../models/MdlLogin';
import { MdlUser } from '../models/MdlUser';
import { LoginService } from '../services/login.service';
import { UserService } from '../shared/services/user.service';

/* TERCEIROS */
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginStore {

    constructor(
        private toastr: ToastrService,
        private loginService: LoginService,
        private userService: UserService,
    ) { }

    private isBusy = new BehaviorSubject<boolean>(false);

    setBusy() {
        this.isBusy.next(!this.isBusy.value);
    }

    getBusy() {
        return this.isBusy.value;
    }

    async postLogin(autenticacao: MdlLogin) {
        // Converte o objeto para JSON
        var body = JSON.stringify(autenticacao);

        var response = new HttpResponse();

        this.setBusy();
        await this.loginService
            .postLogin(body)
            .then(async (responseLogin) => {
                response = responseLogin;

                this.setBusy();

                if (responseLogin.status == 200) {
                    let token = (<MdlToken>responseLogin.body.valueOf());
                    await this.salvarUsuario(token);
                }
                else {
                    this.toastr.error(`Falha ao realizar o acesso, usuário ou senha inválidos.`);
                }
            }, () => {
                this.setBusy();
                this.toastr.error(`Erro de autenticação, usuário ou senha inválidos.`);
            });

        return response;
    }

    async novaSenha(parametros: QpNovaSenha) {
        // Converte o objeto para parametros de query
        var queryParameters = parametros.toParams();

        var response = new HttpResponse();

        this.setBusy();
        await this.loginService
            .novaSenha(queryParameters)
            .then(async (responseSenha) => {
                response = responseSenha;

                this.setBusy();

                if (responseSenha.status == 200) {
                    this.toastr.success(`Senha atualizada.`, `Sucesso!`)
                    let token = (<MdlToken>responseSenha.body.valueOf());
                    await this.salvarUsuario(token);
                }
                else {
                    this.toastr.error(`Falha ao realizar o acesso, usuário ou senha inválidos.`);
                }
            }, () => {
                this.setBusy();
                this.toastr.error(`Erro ao atualizar a senha, os dados são inválidos.`);
            });

        return response;
    }

    async salvarUsuario(token: MdlToken) {
        const user = jwt_decode(token.accessToken) as MdlUser;

        this.userService.setTokenKey(token.accessToken);
        this.userService.setRefreshTokenKey(token.refreshToken);
        this.userService.setUserKey(user.sid);
    }
}