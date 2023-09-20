const express = require("express");
const connectDB = require("../middlewares/connectDB");
const handleExpectedError = require("../functions/handleExpectedErrors");
const esquemaLivros = require("../models/livros");
const router = express.Router();

router.post("/cadastro", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    let { id, titulo, num_paginas, isbn, editora } = req.body;

    const respostaDB = await esquemaLivros.create({
      id,
      titulo,
      num_paginas,
      isbn,
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

router.put("/editar/:livroId", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    let idLivro = req.params.id;

    let { id, titulo, num_paginas, isbn, editora } = req.body;

    const checkLivro = await esquemaLivros.findOne({ livroId: idLivro });
    if (!checkLivro) {
      throw new Error("Este livro não foi encontrado!");
    }

    const livroAtualizado = await esquemaLivros.updateOne(
      { livroId: idLivro },
      {
        id,
        titulo,
        num_paginas,
        isbn,
        editora,
      }
    );
    if (livroAtualizado?.modifiedCount > 0) {
      const dadosLivro = await esquemaLivros.findOne({ livroId: idLivro });

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

router.get("/obter/livros", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
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

router.get("/obter/livros/:livroId", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']

    let idLivro = req.params.id;

    const respostaDB = await esquemaLivros.findOne({ livroId: idLivro });

    if (!respostaDB) {
      throw new Error("Este livro não foi encontrado!");
    }

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro listado com sucesso!",
      resposta: respostaDB,
    });
  } catch (error) {
    return handleExpectedError(res, error);
  }
});

router.delete("/deletar/:livroId", connectDB, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    const idLivro = req.params.id;

    const checkLivro = await esquemaLivros.findOne({ livroId: idLivro });
    if (!checkLivro) {
      throw new Error("Este livro não foi encontrado!");
    }

    const respostaDB = await esquemaLivros.deleteOne({ livroId: idLivro });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro deletado com sucesso!",
      resposta: respostaDB,
    });
  } catch (error) {
    return handleExpectedError(res, error);
  }
});

module.exports = router;