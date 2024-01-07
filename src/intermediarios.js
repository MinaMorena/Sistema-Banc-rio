const { banco } = require("./bancodedados");

async function validandoSenha(req, res, next) {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(403).json({ mensagem: "Acesso negado, necessário senha." });
    }

    if (senha_banco === banco.senha) {
        return next();
    }

    return res.status(403).json({ mensagem: "A senha do banco informada é inválida!" });
}

module.exports = validandoSenha