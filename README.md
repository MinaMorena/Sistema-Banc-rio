# Sistema-Bancário API de Um Banco Digital

Este é um sistema bancário simples implementado com o uso de NodeJS, Express e REST. A API permite realizar diversas operações bancárias, como criar conta bancária, listar contas, atualizar dados do usuário da conta, excluir uma conta, depositar, sacar, transferir valores entre contas, consultar o saldo da conta e emitir extrato bancário.
 
# Persistências dos dados
Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`.
# Endpoints da API
## Listar Contas Bancárias
- **Método:** GET

- **Rota:** `/contas?senha_banco=Cubos123Bank`

- **Descrição:** Listar todas as contas bancárias existentes.

  ![Screenshot 2024-01-09 091949](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/24f9ad1e-ea79-4f6b-8db0-e4d02aced0f8)

## Criar Conta Bancária
- **Método:** POST

- **Rota:** `/contas`

- **Descrição:** Criar uma nova conta bancária com saldo inicial zero.

![Screenshot 2024-01-09 095559](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/79bbd10e-7dfd-414f-9835-1bfd498396cb)

## Atualizar usuário da conta bancária
- **Método:** PUT

- **Rota:** `/contas/:numeroConta/usuario`

- **Descrição:** Atualiza os dados do usuário de uma conta bancária.

![Screenshot 2024-01-09 100006](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/07348ee3-f48d-4f5c-af5e-c1416296b8bf)

## Excluir Conta
- **Método:** DELETE

- **Rota:** `/contas/:numeroConta`

- **Descrição:** Excluir uma conta bancária existente se o saldo for zero.

## Depositar
- **Método:** POST

- **Rota:** `/transacoes/depositar`

- **Descrição:** Realizar um depósito em uma conta bancária e registrar a transação.

![Screenshot 2024-01-09 100711](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/eb16a6af-c211-40fd-af2d-571840a3dc7a)

## Sacar
- **Método:** POST

- **Rota:** `/transacoes/sacar`

- **Descrição:** Realizar um saque em uma conta bancária e registrar a transação.

![Screenshot 2024-01-09 101016](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/fd7378ce-34ea-4b92-8313-8998526b4c09)

## Tranferir
- **Método:** POST

- **Rota:** `/transacoes/transferir`

- **Descrição:** Realizar uma transferência entre contas bancárias e registrar a transação.

![Screenshot 2024-01-09 101234](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/1a8da5d8-4dea-40a5-bfc6-abd2a89a4ab1)

## Saldo
- **Método:** GET

- **Rota:** `/contas/saldo?numero_conta=123&senha=123`

- **Descrição:**  Retorna o saldo de uma conta bancária.

![Screenshot 2024-01-09 102314](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/6764191f-1999-4033-8879-ff891559ceb1)

## Extrato
- **Método:** GET

- **Rota:** `/contas/extrato?numero_conta=123&senha=123`

- **Descrição:** Retorna o extrato de transações de uma conta bancária.

![Screenshot 2024-01-09 102906](https://github.com/MinaMorena/Sistema-Bancario/assets/141373928/645d096b-33cf-4b8e-8f9f-0bb5c031d044)
