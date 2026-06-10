import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';

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

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});