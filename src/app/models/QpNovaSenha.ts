import { HttpParams } from "@angular/common/http";

export class QpNovaSenha {
  documento: string;
  dataNascimento: Date;
  senha: string;

  toParams(): HttpParams {
    let params = new HttpParams()
      .append("Documento", this.documento)
      .append("DataNascimento", this.dataNascimento.toString())
      .append("Senha", this.senha);

    return params;
  }
}
