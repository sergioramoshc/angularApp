/* ANGULAR */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

/* INTERNO */
import { UserService } from '../user.service';

/* TERCEIROS */
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Classe responsável por não deixar ir para a tela de login caso o usuário já esteja logago

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  //verifica de existe um token(usuário logado), caso exista envia o usuário para a tela de login
  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.getTokenKey() == null) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
