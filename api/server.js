require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


const automovelRotas = require("./src/routes/automovel.route");
app.use("/automoveis", automovelRotas);

const estadiaRotas = require("./src/routes/estadia.route");
app.use("/estadias", estadiaRotas);

const porta = process.env.PORT_APP || 3000;

app.listen(porta, () => {
    console.log(`Online na porta ${porta}`);
});