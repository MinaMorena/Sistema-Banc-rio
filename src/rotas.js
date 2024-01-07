const express = require("express");
const validandoSenha = require("./intermediarios");
const { listarTodasAsContas, criarConta } = require("./controladores/contas");

const rotas = express();

//GET /contas?senha_banco=Cubos123Bank
rotas.get("/contas", validandoSenha, listarTodasAsContas);
rotas.post("/contas", criarConta);

module.exports = rotas