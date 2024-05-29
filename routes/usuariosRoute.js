const express = require('express');
const UsuariosController = require('../controllers/usuariosController');
const Autenticacao = require('../middlewares/autenticacao');

class UsuariosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new UsuariosController();
        let auth = new Autenticacao();
        this.#router.get('/', auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/listar', auth.usuarioEstaLogado,ctrl.listarUsuarios);
        this.#router.get('/criar', auth.usuarioIsAdmin, ctrl.criarView);
        this.#router.get('/alterar/:id', auth.usuarioEstaLogado,ctrl.alterarView);
        this.#router.post('/criar', auth.usuarioIsAdmin,ctrl.gravarUsuario);
        this.#router.post('/excluir', auth.usuarioEstaLogado,ctrl.deletarUsuario);
        this.#router.post('/alterar', auth.usuarioEstaLogado,ctrl.alterarUsuario);
    }
}

module.exports = UsuariosRoute;