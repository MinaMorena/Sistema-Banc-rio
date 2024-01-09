const express = require("express");
const validandoSenha = require("./intermediarios");
const { listarTodasAsContas, criarConta, atualizarUsuario, excluirConta } = require("./controladores/contas");
const { depositarValor, sacarDinheiro, transferirDinheiro } = require("./controladores/transacoes");
const { saldoBancario, extratoBancario } = require("./controladores/saldo_extrato");

const rotas = express();

rotas.get("/contas", validandoSenha, listarTodasAsContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarUsuario);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.post("/transacoes/depositar", depositarValor);
rotas.post("/transacoes/sacar", sacarDinheiro);
rotas.post("/transacoes/transferir", transferirDinheiro);
rotas.get("/contas/saldo", saldoBancario);
rotas.get("/contas/extrato", extratoBancario);

module.exports = rotas