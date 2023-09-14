const bancoDeDados = require("../data/bancodedados");
const {
  validarCampos,
  encontrarContaPorNumero,
  dataFormatada,
} = require("./comuns");

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;
  if (!validarCampos(numero_conta, valor)) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Todos os campos precisam ser informados" } });
  }
  let contaEncontrada = encontrarContaPorNumero(numero_conta, bancoDeDados);
  if (!contaEncontrada) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Não existe conta com o número informado" } });
  }

  if (Number(valor) <= 0) {
    return res.status(400).json({
      erro: {
        mensagem: "Não é possivel depositivar valores negativos ou zerados",
      },
    });
  }
  contaEncontrada.saldo += valor;
  bancoDeDados.depositos.push({
    data: dataFormatada(),
    numeroConta: numero_conta,
    valor,
  });
  res.status(204).send();
};
const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;
  if (!validarCampos(numero_conta, valor, senha)) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Todos os campos precisam ser informados" } });
  }
  let contaEncontrada = encontrarContaPorNumero(numero_conta, bancoDeDados);
  if (!contaEncontrada) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Não existe conta com o número informado" } });
  }
  if (senha !== contaEncontrada.usuario.senha) {
    return res.status(400).json({
      erro: {
        mensagem: "A senha informada está incorreta",
      },
    });
  }
  if (Number(valor) <= 0) {
    return res.status(400).json({
      erro: {
        mensagem: "Não é possivel sacar valores negativos ou zerados",
      },
    });
  }
  if (Number(valor) > contaEncontrada.saldo) {
    return res.status(400).json({
      erro: {
        mensagem: "Você não tem saldo suficiente para realizar está operação",
      },
    });
  }
  contaEncontrada.saldo -= valor;
  bancoDeDados.saques.push({
    data: dataFormatada(),
    numeroConta: numero_conta,
    valor,
  });
  res.status(204).send();
};
const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
  if (!validarCampos(numero_conta_origem, numero_conta_destino, valor, senha)) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Todos os campos precisam ser informados" } });
  }
  let contaOrigemEncontrada = encontrarContaPorNumero(
    numero_conta_origem,
    bancoDeDados
  );
  let contaDestinoEncontrada = encontrarContaPorNumero(
    numero_conta_destino,
    bancoDeDados
  );
  if (!contaOrigemEncontrada) {
    return res.status(400).json({
      erro: { mensagem: "A conta de origem da transferencia não existe" },
    });
  }
  if (!contaDestinoEncontrada) {
    return res.status(400).json({
      erro: { mensagem: "A conta de destino da transferencia não existe" },
    });
  }
  if (senha !== contaOrigemEncontrada.usuario.senha) {
    return res.status(400).json({
      erro: {
        mensagem: "A senha informada está incorreta",
      },
    });
  }
  if (Number(valor) <= 0) {
    return res.status(400).json({
      erro: {
        mensagem: "Não é possivel transferir valores negativos ou zerados",
      },
    });
  }
  if (Number(valor) > contaOrigemEncontrada.saldo) {
    return res.status(400).json({
      erro: {
        mensagem: "Você não tem saldo suficiente para realizar está operação",
      },
    });
  }
  contaOrigemEncontrada.saldo -= valor;
  contaDestinoEncontrada.saldo += valor;
  bancoDeDados.transferencias.push({
    data: dataFormatada(),
    numero_conta_origem: numero_conta_origem,
    numero_conta_destino: numero_conta_destino,
    valor,
  });
  res.status(204).send();
};

module.exports = {
  transferir,
  sacar,
  depositar,
};
