Mazza Bank - Frontend

Projeto de Agendamento de Transferências Bancárias

🚀 Tecnologias Utilizadas

Angular
RxJS
HttpClient
📌 Funcionalidades do Frontend

🔹 Listar Transferências
A página exibe todas as transferências agendadas, com a capacidade de visualizar detalhes como nome do usuário, contas envolvidas, valor da transferência e status.

🔹 Criar Transferência
O formulário permite que o usuário preencha os dados necessários para realizar uma transferência bancária agendada. O front-end envia esses dados para a API do back-end para agendamento.

Exemplo de Payload para o formulário de transferência:
{
  "nomeUsuario": "João da Silva",
  "documentoUsuario": "123.456.789-00",
  "contaOrigem": 1001,
  "contaDestino": 2002,
  "valorTransferencia": 1500.00,
  "valorTaxa": 10.00,
  "dataHoraTransferencia": "2025-02-01T10:00:00",
  "dataHoraAgendamento": "2025-02-01T08:00:00"
}

Exemplo de resposta de sucesso:
{
  "mensagem": "Transferência agendada com sucesso!",
  "valorTaxado": 10.00,
  "isSucesso": true
}

🔹 Exibição das Transferências
O front-end consome a API do back-end para listar todas as transferências feitas, exibindo uma tabela com os agendamentos realizados.

📌 Como executar o projeto

Clone o repositório:
git clone https://github.com/gabrielnunes0204/mazza-transfer-front.git

Acesse a pasta do projeto:
Ex: cd mazza-transfer-front

Dentro do diretório e utilizando um terminal de sua preferência, instale as dependências do projeto:
npm install

Execute o servidor de desenvolvimento:
ng serve

A aplicação estará disponível em: http://localhost:4200