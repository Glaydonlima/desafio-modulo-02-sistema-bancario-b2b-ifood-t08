const { format } = require("date-fns");

function encontrarContaPorNumero(numero_conta, bancoDeDados) {
  return bancoDeDados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );
}
function dataFormatada() {
  const data = new Date();

  const dataFormatada = format(data, "yyyy-MM-dd HH:mm:ss");
  return dataFormatada;
}

function validarCampos(...params) {
  return params.every((campo) => campo);
}

function MesmoCpf(cpf, bancoDeDados) {
  return bancoDeDados.contas.find((conta) => conta.usuario.cpf === cpf);
}
function MesmoEmail(email, bancoDeDados) {
  return bancoDeDados.contas.find((conta) => conta.usuario.email === email);
}

module.exports = {
  MesmoEmail,
  validarCampos,
  MesmoCpf,
  encontrarContaPorNumero,
  dataFormatada,
};
