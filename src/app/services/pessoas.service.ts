/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/* INTERNO */
import { environment } from 'src/environments/environment';

/* TERCEIROS */

const URL_API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})

export class PessoasService {

  constructor(
    private http: HttpClient
  ) { }

  async getPessoa(idPessoa: string) {
    return await this.http
      .get<any>(`${URL_API}/Pessoas/${idPessoa}`,
        {
          observe: 'response',
        })
      .toPromise();
  }
}
