let { contas } = require("../bancodedados");

let idContaDisponivel = 2;

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
                telefone,
                email,
                senha,
            }
        }

        contas.push(conta);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno." });
    }
}

async function atualizarUsuario(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    try {
        if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." })
        }

        if (isNaN(Number(numeroConta))) {
            return res.status(400).json({ mensagem: "O número da conta precisa ser um número válido." })
        }

        const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numeroConta));

        if (!contaUsuario) {
            return res.status(404).json({ mensagem: "Conta bancária inexistente" })
        }

        const cpfJaExiste = contas.find(conta => conta.usuario.cpf === cpf);
        const emailJaExiste = contas.find(conta => conta.usuario.email === email);

        if (cpfJaExiste || emailJaExiste) {
            return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" })
        }

        contaUsuario.usuario.nome = nome;
        contaUsuario.usuario.cpf = cpf;
        contaUsuario.usuario.data_nascimento = data_nascimento;
        contaUsuario.usuario.telefone = telefone;
        contaUsuario.usuario.email = email;
        contaUsuario.usuario.senha = senha;

        return res.send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno." })
    }
}

async function excluirConta(req, res) {
    const { numeroConta } = req.params;

    try {
        if (isNaN(Number(numeroConta))) {
            return res.status(400).json({ mensagem: "O número da conta precisa ser um número válido." })
        }

        const contaUsuario = contas.find(conta => conta.numero_da_conta === Number(numeroConta));

        if (!contaUsuario) {
            return res.status(404).json({ mensagem: "Conta bancária inexistente" })
        }

        if (contaUsuario.saldo !== 0) {
            return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
        }

        const contaExluida = contas.filter(conta => conta.numero_da_conta !== Number(numeroConta));
        contas = contaExluida;
        return res.send();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno." })
    }
}

module.exports = {
    listarTodasAsContas,
    criarConta,
    atualizarUsuario,
    excluirConta
}