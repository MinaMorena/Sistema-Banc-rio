const { contas, depositos, saques, transferencias } = require("../bancodedados");
const { format } = require("date-fns");

async function depositarValor(req, res) {
    const { numero_conta, valor } = req.body;

    if (isNaN(Number(valor)) || Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor precisa ser um número positivo válido." })
    }

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" })
    }

    const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numero_conta));

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: "Conta bancária inexistente" })
    }

    contaUsuario.saldo += Number(valor);
    depositos.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor: Number(valor)
    });
    return res.status(204).json();
}

async function sacarDinheiro(req, res) {
    const { numero_conta, valor, senha } = req.body;

    if (isNaN(Number(valor)) || Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor precisa ser um número positivo válido." })
    }

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "O número da conta, o valor e a senha são obrigatórios!" })
    }

    const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numero_conta));

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: "Conta bancária inexistente" })
    }

    if (senha !== contaUsuario.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." })
    }

    if (Number(valor) > contaUsuario.saldo) {
        return res.status(401).json({ mensagem: "Saldo insuficiente." })
    }

    contaUsuario.saldo -= Number(valor);
    saques.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor: Number(valor)
    });
    return res.status(204).json();
}

async function transferirDinheiro(req, res) {
    const { numero_conta_origem, numero_conta_destino, senha, valor } = req.body;

    if (isNaN(Number(valor)) || Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor precisa ser um número positivo válido." })
    }

    if (!numero_conta_destino || !numero_conta_origem || !senha || !valor) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." })
    }

    const contaOrigem = contas.find(conta => conta.numero_da_conta === Number(numero_conta_origem));
    const contaDestino = contas.find(conta => conta.numero_da_conta === Number(numero_conta_destino));

    if (!contaOrigem) {
        return res.status(404).json({ mensagem: "Conta bancária de origem inexistente." })
    }

    if (!contaDestino) {
        return res.status(404).json({ mensagem: "Conta bancária de destino inexistente." })
    }

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." })
    }

    if (Number(valor) > contaOrigem.saldo) {
        return res.status(401).json({ mensagem: "Saldo insuficiente." })
    }

    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);

    transferencias.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor: Number(valor)
    });
    return res.status(204).json();
}
module.exports = {
    depositarValor,
    sacarDinheiro,
    transferirDinheiro
}