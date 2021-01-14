/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

/* INTERNO */
import { environment } from 'src/environments/environment';

/* TERCEIROS */
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';
import { UtilsService } from '../../../../shared/services/utils.service';

const URL_API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})

export class HistoricoStore {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private utilsService: UtilsService,
    private userService: UserService,
  ) { }

  private isBusy = new BehaviorSubject<boolean>(false);

  setBusy() {
    this.isBusy.next(!this.isBusy.value);
  }

  getBusy() {
    return this.isBusy.value;
  }

  // Faz a rotina interna do modal
}
