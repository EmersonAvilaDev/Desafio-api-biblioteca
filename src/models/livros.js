const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  titulo: {
    type: String,
    unique: true,
    required: "Este campo é obrigatório",
    index: true
  },
  numeroPaginas: {
    type: Number,
    required: "Este campo é obrigatório",
  },
  codigoISBN: {
    type: Number,
    required: "Este campo é obrigatório",
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