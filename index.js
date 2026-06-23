import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from './models/Artista.js';
import Instrumento from './models/Instrumento.js';

const app = express();
const PORT = 3000;

// Configura o EJS como motor de views

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// pasta onde ficam os arquivos .ejs

app.set("views", "./views"); 

//Liberar acesso a pasta public

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { INSPECT_MAX_BYTES } from "buffer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("index");
});

//Rotas do gênero

app.get("/genero/lst", async (req, res) => {
  const generos = await Genero.find()
  res.render("genero/lst", {generos});
});

app.post('/genero/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const generos = await Genero.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("genero/lst", { generos });
})

app.get("/genero/add",  (req, res) => {

  res.render("genero/add");
});

app.post("/genero/add", async (req, res) => {
  const nome = req.body.nome;
  //grava no banco de dados(Mongo)
  await Genero.create({nome});
  res.render("genero/addok");
});

//Update

app.get('/genero/edt/:id', async (req, res) => {

const genero = await Genero.findById(req.params.id)

res.render("genero/edt", {genero})

})

app.post('/genero/edt/:id', async (req, res) => {

const genero = await Genero.findByIdAndUpdate(req.params.id, req.body)

res.render("genero/edtok")

})

//Excluir

app.get('/genero/del/:id', async (req, res) => {

const genero = await Genero.findByIdAndDelete(req.params.id)

res.redirect("/genero/lst")

})

//Rotas de música

app.get("/musica/lst", async (req, res) => {
  const musicas = await Musica.find()
  res.render("musica/lst", {musicas});
});

app.post('/musica/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const musicas = await Musica.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("musica/lst", { musicas });
})

app.get("/musica/add", (req, res) => {
  res.render("musica/add");
});

app.post("/musica/add", async (req, res) => {
  const {nome, duracao, artista, ano} = req.body;
  await Musica.create({nome, duracao, artista, ano})
  res.render("musica/addok");
});

//Update

app.get('/musica/edt/:id', async (req, res) => {

const musica = await Musica.findById(req.params.id)

res.render("musica/edt", {musica})

})

app.post('/musica/edt/:id', async (req, res) => {

const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)

res.render("musica/edtok")

})

//Excluir

app.get('/musica/del/:id', async (req, res) => {

const musica = await Musica.findByIdAndDelete(req.params.id)

res.redirect("/musica/lst")

})

//Rotas de Artista

app.get("/artista/lst", async (req, res) => {
  const artista = await Artista.find()
  res.render("artista/lst", {artista});
});

app.post('/artista/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const artista = await Artista.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("artista/lst", { artista });
})

app.get("/artista/add",  (req, res) => {

  res.render("artista/add");
});

app.post("/artista/add", async (req, res) => {
  const nome = req.body.nome;
  await Artista.create({nome});
  res.render("artista/addok");
});

//Update

app.get('/artista/edt/:id', async (req, res) => {

const artista = await Artista.findById(req.params.id)

res.render("artista/edt", {artista})

})

app.post('/artista/edt/:id', async (req, res) => {

const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)

res.render("artista/edtok")

})

//Excluir

app.get('/artista/del/:id', async (req, res) => {

const artista = await Artista.findByIdAndDelete(req.params.id)

res.redirect("/artista/lst")

})

//Rotas de Instrumento

app.get("/instrumento/lst", async (req, res) => {
  const instrumento = await Instrumento.find()
  res.render("instrumento/lst", {instrumento});
});

app.post('/instrumento/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const instrumento = await Instrumento.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("instrumento/lst", { instrumento });
})

app.get("/instrumento/add",  (req, res) => {

  res.render("instrumento/add");
});

app.post("/instrumento/add", async (req, res) => {
  const nome = req.body.nome;
  const tipo = req.body.tipo;
  await Instrumento.create({nome, tipo});
  res.render("instrumento/addok");
});

//Update

app.get('/instrymento/edt/:id', async (req, res) => {

const instrumento = await Instrumento.findById(req.params.id)

res.render("instrumento/edt", {instrumento})

})

app.post('/instrumento/edt/:id', async (req, res) => {

const instrumento = await Instrumento.findByIdAndUpdate(req.params.id, req.body)

res.render("instrumento/edtok")

})

//Excluir

app.get('/instrumento/del/:id', async (req, res) => {

const instrumento = await Instrumento.findByIdAndDelete(req.params.id)

res.redirect("/instrumento/lst")

})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});