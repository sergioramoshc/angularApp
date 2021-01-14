/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

/* INTERNO */
import { UserService } from '../shared/services/user.service';
import { TblPessoas } from '../models/TblPessoas';

/* TERCEIROS */
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { PessoasService } from '../services/pessoas.service';

@Injectable({
    providedIn: 'root'
})

export class PessoasStore {

    constructor(
        private pessoasService: PessoasService,
        private toastr: ToastrService,
        private userService: UserService,
    ) { }


    private isBusy = new BehaviorSubject<boolean>(false);

    setBusy() {
        this.isBusy.next(!this.isBusy.value);
    }

    getBusy() {
        return this.isBusy.value;
    }

    private pessoas = new BehaviorSubject<TblPessoas[]>([]);

    setPessoasSubject(pessoas: TblPessoas[]) {
        this.pessoas.next(pessoas);
    }

    getPessoasSubject() {
        return this.pessoas.value;
    }

    resetPessoasSubject() {
        this.pessoas = new BehaviorSubject<TblPessoas[]>([]);
    }

    async getPessoa() {

        this.resetPessoasSubject();

        var idPessoa = this.userService.getUserKey();

        var response = new HttpResponse();

        this.setBusy();
        await this.pessoasService
            .getPessoa(idPessoa)
            .then((responsePessoa) => {
                this.setBusy();
                response = responsePessoa;

                if (response.status != 200) {
                    this.toastr.error(`Falha ao buscar pessoa. Desc.:`, `${response.body}`);
                }
            }, () => {
                this.setBusy();
                this.toastr.error('Falha ao buscar pessoa, tente novamente em breve.');
            });

        return response;
    }
}
