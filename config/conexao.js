import mongoose from "mongoose";

//const url = "mongodb+srv://aluno:123@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://aluno123:123@cluster0.sv9jqjy.mongodb.net/?appName=Cluster0"

const conexao = await mongoose.connect(url)

export default conexao