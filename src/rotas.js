const express = require("express");
const validandoSenha = require("./intermediarios");
const { listarTodasAsContas, criarConta, atualizarUsuario, excluirConta } = require("./controladores/contas");
const { depositarValor } = require("./controladores/transacoes");

const rotas = express();

rotas.get("/contas", validandoSenha, listarTodasAsContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarUsuario);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.post("/transacoes/depositar", depositarValor);

module.exports = rotas