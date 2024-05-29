//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Autenticacao = require('./middlewares/autenticacao');
const HomeRoute = require('./routes/homeRoute');
const LoginRoute = require('./routes/loginRoute');
const UsuariosRoute = require('./routes/usuariosRoute');
const cookieParser = require('cookie-parser');

const app = express();

//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
app.use(cookieParser());
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');
// Altera a configuração padrão do EJS para que as views sejam compiladas de maneira assíncrona
// Assim, o sistema permite chamar funções que consultam o banco de dados direto nas nossas views EJS
const ejs = require('ejs');
const ServicosRoute = require('./routes/servicosRoute');
const VeiculosRoute = require('./routes/veiculosRoute');
let ejsOptions = {
  async: true
};
app.engine('ejs', async (path, data, cb) => {
  try{
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  }catch (e){
    cb(e, '');
  }
});
//Configuração de onde ficará nossas views
app.set('views', './views');


//define um title generico para todas as nossas páginas
// a variavel title será chamada no nosso arquivo layout na tag title
app.locals.title = "Programação FullStack 1";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(expressLayouts);

//definindo as rotas que o nosso sistema vai reconhecer através da url do navegador
let loginRota = new LoginRoute();
app.use('/login', loginRota.router);

let homeRota = new HomeRoute();
app.use('/', homeRota.router)
let usuarioRota = new UsuariosRoute();
app.use('/usuarios', usuarioRota.router);
let servicoRota = new ServicosRoute();
app.use('/servicos', servicoRota.router);
let veiculoRota = new VeiculosRoute();
app.use('/veiculos', veiculoRota.router);

//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});
