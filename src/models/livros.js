const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: "Este campo é obrigatório",
    index: true
  },
  titulo: {
    type: String,
    unique: true,
    required: "Este campo é obrigatório",
    index: true
  },
  num_paginas: {
    type: Number,
    required: "Este campo é obrigatório",
  },
  isbn: {
    type: String,
    unique: true,
    required: "Este campo é obrigatório",
    index: true
  },
  editora: {
    type: String,
    required: "Este campo é obrigatório",
  },
},
{
  timestamps: true
});

const esquemaLivros = mongoose.models.livros || mongoose.model("livros", schema);
module.exports = esquemaLivros; 