const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.estadia.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.estadia.findMany({
        include: { Automovel: true }
    });

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.estadia.findUnique({
        where: { id: Number(id) },
        include: { Automovel: true }
    });

    res.json(item).status(200).end();
};

const finalizar = async (req, res) => {
    const { id } = req.params;

    const estadia = await prisma.estadia.findUnique({
        where: { id: Number(id) }
    });

    if (!estadia) {
        return res.status(404).json({ erro: "Estadia não encontrada" });
    }

    const agora = new Date();
    const horas = (agora - new Date(estadia.entrada)) / 1000 / 60 / 60;

    const total = horas * estadia.valorHora;

    const item = await prisma.estadia.update({
        where: { id: Number(id) },
        data: {
            saida: agora,
            valorTotal: total
        }
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.estadia.delete({
        where: { id: Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    finalizar,
    excluir
};