const express = require("express");
const connectDB = require("../middlewares/connectDB");
const handleExpectedError = require("../functions/handleExpectedErrors");
const esquemaLivros = require("../models/livros");
const router = express.Router();

router.post("/cadastrar", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    let { titulo, numeroPaginas, codigoISBN, editora } = req.body;

    const respostaDB = await esquemaLivros.create({
      titulo,
      numeroPaginas,
      codigoISBN,
      editora,
    });

    res.status(200).json({
      status: 'OK',
      statusMensagem: "Livro cadastrado com sucesso!",
      resposta: respostaDB
    })

  } catch (error) {
    if(String(error).includes("duplicate key erro")){
      return handleExpectedError(res, 'Error: Este livro já está cadastrado')
    }
    return handleExpectedError(res, error);
  }
});

module.exports = router;
