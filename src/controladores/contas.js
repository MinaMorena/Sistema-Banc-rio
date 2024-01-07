const { contas } = require("../bancodedados");

let idContaDisponivel = 1;

async function listarTodasAsContas(req, res) {
    return res.json(contas)
}

async function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." })
        }

        const cpfJaExiste = contas.find(conta => conta.usuario.cpf === cpf);
        const emailJaExiste = contas.find(conta => conta.usuario.email === email);

        if (cpfJaExiste || emailJaExiste) {
            return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" })
        }

        const conta = {
            numero_da_conta: idContaDisponivel++,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone, email,
                senha,
            }
        }

        contas.push(conta);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    listarTodasAsContas,
    criarConta
}