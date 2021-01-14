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

export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  async postLogin(body: string) {
    return await this.http
      .post<any>(`${URL_API}/Login`,
        body,
        {
          observe: 'response',
        })
      .toPromise();
  }

  async novaSenha(queryParameters: HttpParams) {
    return await this.http
      .post<any>(`${URL_API}/Login/NovaSenha`,
        null, // Body
        {
          observe: 'response',
          params: queryParameters,
        }) // Options
      .toPromise();
  }
}
