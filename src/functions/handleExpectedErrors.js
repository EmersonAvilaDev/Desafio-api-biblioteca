const S = require("string");

const handleExpectedError = (res, err) => {
// Entra quando o mongoose da algum erro  
  if (String(err).includes("validationError:")) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: S(String(err).replace("validationError:", "")).replaceAll(
        ":",
        ""
      ).s,
      resposta: String(err),
    });
  }

// Pode ser um erro definido manualmente por mim
  if (String(err).includes("Error: ")) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: String(err).replace("Error: ", ""),
      resposta: String(err),
    });
  }

// Erro Inesperado
  console.error(err);
  return res.status(500).json({
    status: "Erro",
    statusMensagem: "Ocorreu um erro inesperado, tente novamente mais tarde",
    resposta: String(err),
  })
};

module.exports = handleExpectedError;