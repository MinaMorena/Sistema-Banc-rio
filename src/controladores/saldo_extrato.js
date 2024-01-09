const { contas, saques, depositos, transferencias } = require("../bancodedados");

async function saldoBancario(req, res) {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" })
    }

    const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numero_conta));

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: "Conta bancária inexistente" })
    }

    if (senha !== contaUsuario.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." })
    }

    return res.json({ saldo: contaUsuario.saldo });
}

async function extratoBancario(req, res) {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" })
    }

    const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numero_conta));

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: "Conta bancária inexistente" })
    }

    if (senha !== contaUsuario.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." })
    }

    const saquesDaConta = saques.filter(saque => saque.numero_conta === numero_conta);
    const depositosDaConta = depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta
    });
    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta
    });

    return res.json({
        depositos: depositosDaConta,
        saques: saquesDaConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    });
}

module.exports = {
    saldoBancario,
    extratoBancario
}