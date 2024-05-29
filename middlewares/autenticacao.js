const UsuarioModel = require("../models/usuarioModel");
const Criptografia = require("../utils/criptografia");
class Autenticacao {

    constructor(){

    } 

    async usuarioEstaLogado(req, res, next) {
        if(req.headers.cookie != null && req.headers.cookie.includes("usuarioLogado") != null) {
            let cripto = new Criptografia();
            var usuId = cripto.descriptografa(req.cookies.usuarioLogado);
            res.locals.usuarioLogado = await new UsuarioModel().buscarUsuario(usuId);
            next();
        }
        else{
            res.redirect("/login");
        }
    }

    async usuarioIsAdmin(req, res, next){
        if(req.cookies != undefined && req.cookies.usuarioLogado != undefined) {
            let cripto = new Criptografia();
            var usuId = cripto.descriptografa(req.cookies.usuarioLogado);
            let usuario = await new UsuarioModel().buscarUsuario(usuId);
            res.locals.usuarioLogado = usuario;
            if(usuario.perfilId == 1) { //perfil adm          
                next();
            }
            else{
                res.redirect("/nao-autorizado");
            }
        }
        else{
            res.redirect("/nao-autorizado");
        }
    }
}

module.exports = Autenticacao;