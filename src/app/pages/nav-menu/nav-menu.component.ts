/* ANGULAR */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* INTERNO */
import { UserService } from 'src/app/shared/services/user.service';

/* TERCEIROS */

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  //injeção de dependencia angular
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.userService.limpaKeys();
    this.router.navigate(['']);
  }
}
