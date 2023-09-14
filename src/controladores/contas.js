const bancoDeDados = require("../data/bancodedados");
const {
  MesmoEmail,
  MesmoCpf,
  encontrarContaPorNumero,
  validarCampos,
} = require("./comuns");

const listarContas = (req, res) => {
  if (bancoDeDados.contas.length === 0) {
    return res.status(200).json({
      erro: { mensagem: "Não há contas no banco" },
    });
  }
  return res.status(200).json(bancoDeDados.contas);
};
const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  if (!validarCampos(nome, cpf, data_nascimento, telefone, email, senha)) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Todos os campos precisam ser informados" } });
  }
  const contaComMesmoCpf = MesmoCpf(cpf, bancoDeDados);
  const contaComMesmoEmail = MesmoEmail(email, bancoDeDados);
  if (contaComMesmoCpf || contaComMesmoEmail) {
    return res.status(400).json({
      erro: {
        mensagem: "Já existe uma conta com o cpf ou e-mail informado!",
      },
    });
  }
  const contaNova = {
    numero: bancoDeDados.numerador++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  bancoDeDados.contas.push(contaNova);
  res.status(201).send();
};

const modificarConta = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const numeroContaEhValido = bancoDeDados.contas.some(
    (conta) => conta.numero === Number(numeroConta)
  );
  if (!numeroContaEhValido) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Não existe conta com o número informado" } });
  }
  if (!validarCampos(!nome, cpf, data_nascimento, telefone, email, senha)) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Todos os campos precisam ser informados" } });
  }
  const contaComMesmoCpf = MesmoCpf(cpf, bancoDeDados);
  const contaComMesmoEmail = MesmoEmail(email, bancoDeDados);
  if (contaComMesmoCpf) {
    return res.status(400).json({
      erro: {
        mensagem: "O CPF informado já existe cadastrado!",
      },
    });
  }
  if (contaComMesmoEmail) {
    return res.status(400).json({
      erro: {
        mensagem: "O E-mail informado já existe cadastrado!",
      },
    });
  }
  let procurarConta = encontrarContaPorNumero(numeroConta, bancoDeDados);
  procurarConta.usuario = {
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
  };
  res.status(204).send();
};

const deletarConta = (req, res) => {
  const { numeroConta } = req.params;
  let indexConta = bancoDeDados.contas.findIndex((conta) => {
    return conta.numero === Number(numeroConta);
  });
  if (indexConta === -1) {
    return res
      .status(400)
      .json({ erro: { mensagem: "Não existe conta com o número informado" } });
  }
  if (bancoDeDados.contas[indexConta].saldo > 0) {
    return res.status(400).json({
      erro: { mensagem: "A conta só pode ser removida se o saldo for zero!" },
    });
  }
  bancoDeDados.contas.splice(indexConta, 1);
  res.status(204).send();
};
const mostrarSaldo = (req, res) => {
  const { numero_conta, senha } = req.query;
  if (!numero_conta) {
    return res.status(401).json({
      erro: {
        mensagem: "O número da conta precisa ser informada!",
      },
    });
  }
  if (!senha) {
    return res.status(401).json({
      erro: {
        mensagem: "A senha do banco precisa ser informada!",
      },
    });
  }
  let contaEncontrada = encontrarContaPorNumero(numero_conta, bancoDeDados);
  if (senha !== contaEncontrada.usuario.senha) {
    return res.status(400).json({
      erro: {
        mensagem: "A senha informada está incorreta",
      },
    });
  }
  res.status(200).json({ saldo: contaEncontrada.saldo });
};
const mostrarExtrato = (req, res) => {
  const { numero_conta, senha } = req.query;
  if (!numero_conta) {
    return res.status(401).json({
      erro: {
        mensagem: "O número da conta precisa ser informada!",
      },
    });
  }
  if (!senha) {
    return res.status(401).json({
      erro: {
        mensagem: "A senha do banco precisa ser informada!",
      },
    });
  }
  let contaEncontrada = encontrarContaPorNumero(numero_conta, bancoDeDados);
  if (senha !== contaEncontrada.usuario.senha) {
    return res.status(400).json({
      erro: {
        mensagem: "A senha informada está incorreta",
      },
    });
  }
  const transferenciasEnviadas = [];
  const transferenciasRecebidas = [];
  for (let transferencia of bancoDeDados.transferencias) {
    if (transferencia.numero_conta_origem === numero_conta) {
      transferenciasEnviadas.push(transferencia);
    } else if (transferencia.numero_conta_destino === numero_conta) {
      transferenciasRecebidas.push(transferencia);
    }
  }
  res.status(200).json({
    depositos: bancoDeDados.depositos,
    saques: bancoDeDados.saques,
    transferenciasEnviadas,
    transferenciasRecebidas,
  });
};

module.exports = {
  mostrarExtrato,
  mostrarSaldo,
  deletarConta,
  modificarConta,
  criarConta,
  listarContas,
};
