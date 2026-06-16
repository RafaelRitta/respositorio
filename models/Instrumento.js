import conexao from "../config/conexao.js";

const InstrumentoSchema = new conexao.Schema({
  nome: String,
  tipo: String
});

const Instrumento = conexao.model("Instrumento", InstrumentoSchema);

export default Instrumento;