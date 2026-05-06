const express = require("express");
const router = express.Router();

const {
    cadastrar,
    listar,
    buscar,
    finalizar,
    excluir
} = require("../controllers/estadia.controller");

router.post("/cadastrar", cadastrar);
router.get("/listar", listar);
router.get("/buscar/:id", buscar);
router.put("/finalizar/:id", finalizar);
router.delete("/excluir/:id", excluir);

module.exports = router;