const { contas, depositos } = require("../bancodedados");
const { format } = require("date-fns");

async function depositarValor(req, res) {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" })
    }

    const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numero_conta));

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: "Conta bancária inexistente" })
    }

    if (isNaN(Number(valor)) || Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor precisa ser um número positivo válido." })
    }

    contaUsuario.saldo += Number(valor);
    depositos.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor: Number(valor)
    })
    return res.status(201).json();
}

module.exports = {
    depositarValor
}