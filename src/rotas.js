const express = require("express");
const rotas = express();
const contas = require("./controladores/contas");
const transacoes = require("./controladores/transacoes");
const validaSenha = require("./intermediarios/validaSenha");

rotas.get("/contas", validaSenha, contas.listarContas);
rotas.post("/contas", contas.criarConta);
rotas.put("/contas/:numeroConta/usuario", contas.modificarConta);
rotas.delete("/contas/:numeroConta", contas.deletarConta);
rotas.post("/transacoes/depositar", transacoes.depositar);
rotas.post("/transacoes/sacar", transacoes.sacar);
rotas.post("/transacoes/transferir", transacoes.transferir);
rotas.get("/contas/saldo", contas.mostrarSaldo);
rotas.get("/contas/extrato", contas.mostrarExtrato);

module.exports = rotas;
