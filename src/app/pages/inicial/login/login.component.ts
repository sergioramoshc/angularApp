/* ANGULAR */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* INTERNO */
import { MdlLogin } from 'src/app/models/MdlLogin';
import { LoginStore } from '../../../stores/login.store';

/* TERCEIROS */

declare let $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  toastHeader: string;
  toastMessage: string;

  //injeção de dependencia angular
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginStore: LoginStore,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  async validarLogin(formGroup: FormGroup) {
    var form = formGroup.getRawValue();

    if (form.user && form.pass) {
      var autenticacao = new MdlLogin();
      autenticacao.user = form.user;
      autenticacao.password = form.pass;
      autenticacao.refreshToken = "string";
      autenticacao.grantType = "password";

      var response = await this.loginStore.postLogin(autenticacao);
      if (response.status == 200) {
        this.router.navigate(['/painel']);
      }
    }
  }
}
