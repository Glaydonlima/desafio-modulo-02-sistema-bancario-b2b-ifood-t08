const bancoDeDados = require('../data/bancodedados')

module.exports = (req, res, next) => {
  const { senha_banco } = req.query;
  if (!senha_banco) {
    return res.status(401).json({
      erro: {
        mensagem: "A senha do banco precisa ser informada!",
      },
    });
  } else if (senha_banco !== bancoDeDados.banco.senha) {
    return res.status(401).json({
      erro: {
        mensagem: "A senha do banco informada é inválida!",
      },
    })
  }
  next();
};

