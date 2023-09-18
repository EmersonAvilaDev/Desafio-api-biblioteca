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
      status: "OK",
      statusMensagem: "Livro cadastrado com sucesso!",
      resposta: respostaDB,
    });
  } catch (error) {
    if (String(error).includes("duplicate key erro")) {
      return handleExpectedError(res, "Error: Este livro já está cadastrado");
    }
    return handleExpectedError(res, error);
  }
});

router.put("/editar/:id", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    let idLivro = req.params.id;
    let { titulo, numeroPaginas, codigoISBN, editora } = req.body;

    const checkLivro = await esquemaLivros.findById({ _id: idLivro });
    if (!checkLivro) {
      throw new Error("Este livro não foi encontrado!");
    }

    const livroAtualizado = await esquemaLivros.updateOne(
      { _id: idLivro },
      {
        titulo,
        numeroPaginas,
        codigoISBN,
        editora,
      }
    );
    if (livroAtualizado?.modifiedCount > 0) {
      const dadosLivro = await esquemaLivros.findById({ _id: idLivro });

      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro atualizado com sucesso!",
        resposta: dadosLivro,
      });
    }
  } catch (error) {
    return handleExpectedError(res, error);
  }
});
module.exports = router;

router.get("/obter/livros", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    // #swagger.description = 'Endpoint para obter todas os livros.'

    const respostaDB = await esquemaLivros.find({});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livros listados com sucesso!",
      resposta: respostaDB,
    });
  } catch (error) {
    return handleExpectedError(res, error);
  }
});

router.delete("/deletar/livro/:id", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    const idLivro = req.params.id;

    const checkLivro = await esquemaLivros.findById({ _id: idLivro });
    if (!checkLivro) {
      throw new Error("Este livro não foi encontrado!");
    }

    const respostaDB = await esquemaLivros.deleteOne({_id: idLivro});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livros deletado com sucesso!",
      resposta: respostaDB,
    });
  } catch (error) {
    return handleExpectedError(res, error);
  }
});
