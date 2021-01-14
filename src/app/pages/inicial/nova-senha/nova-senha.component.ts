/* ANGULAR */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* INTERNO */
import { QpNovaSenha } from 'src/app/models/QpNovaSenha';
import { LoginStore } from 'src/app/stores/login.store';

/* TERCEIROS */
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  acessoForm: FormGroup;

  //injeção de dependencia angular
  constructor(
    private formBuilder: FormBuilder,
    private loginStore: LoginStore,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.acessoForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      nascimento: ['', Validators.required],
      pass: ['', Validators.required],
      repass: ['', Validators.required]
    })

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

  async validarDados(formGroup: FormGroup) {

    var form = formGroup.getRawValue();

    // Se as senhas forem diferentes a requisição é anulada
    if (form.pass) {
      if (form.pass == form.repass) {
        var parametros = new QpNovaSenha;
        parametros.documento = form.cpf;
        parametros.senha = form.pass;
        parametros.dataNascimento = form.nascimento;

        var response = await this.loginStore.novaSenha(parametros);
        console.log(response);
        if (response.status == 200) {
          this.router.navigate(['/painel']);
        }
      } else {
        this.toastr.error('As senhas estão diferentes, tente novamente.');
        formGroup.get('pass').setValue("");
        formGroup.get('repass').setValue("");
      }
    }
  }
}
