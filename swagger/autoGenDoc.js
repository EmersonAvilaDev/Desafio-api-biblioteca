const mongooseToSwagger = require("mongoose-to-swagger");
const esquemaLivros = require("../src/models/livros.js");
const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  language: "pt-BR",
});

const outputFile = "./swagger_output.json";
const endpointFiles = ["../index.js", "../src/routes.js"];

let doc = {
  info: {
    version: "1.0.0",
    title: "API da biblioteca",
    description: "Documentação da API da biblioteca",
  },
  servers: [
    {
      url: "http://localhost:4000/",
      description: "Servidor localhost",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  components: {
    schemas: {
      Livros: mongooseToSwagger(esquemaLivros)
    },
  
  },
};

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  console.log(
    "Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile
  );
  if (process.env.NODE_ENV !== "production") {
    require("../index.js");
  }
});
