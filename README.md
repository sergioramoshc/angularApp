ATENÇÃO: Este projeto é apenas um pequeno pedaço de um projeto que produzi na Statum, onde retirei grande parte da regra de negócios para preservar a integridade do sistema. Por esse motivo, as funções do sistema não foram preservadas por completo.

Como executar a aplicação Web

* Ambiente:

1. Ter instalado o Node.js em sua última versão (https://nodejs.org/pt-br/download/);

2. Executar o seguinte comando no console da máquina:

npm install -g @angular/cli@latest

* Solução:

1. No diretório da aplicação, executar o seguinte comando no console e aguardar:

npm install

2. Edite a URL da API em "angularApp\src\environments\environment.ts";

3. Execute o seguinte comando para iniciar a aplicação:

ng serve --o

* Pode ser solicitado uma permissão adicional para executar os scripts do angular em sua máquina (ng.ps1), neste caso, abra um prompt de comando como administrar e execute: 

powershell Set-ExecutionPolicy RemoteSigned

Para revogar a permissão basta digitar: 

powershell Set-ExecutionPolicy Restricted
