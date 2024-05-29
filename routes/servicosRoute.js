const express = require('express');
const Autenticacao = require('../middlewares/autenticacao');
const ServicoController = require('../controllers/servicoController');

class ServicosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new ServicoController();
        let auth = new Autenticacao();
        this.#router.get('/listar', auth.usuarioEstaLogado,ctrl.listarView);
        this.#router.get('/alocar', auth.usuarioEstaLogado, ctrl.alocarView);
        this.#router.post('/alocar', auth.usuarioEstaLogado, ctrl.alocarServico);
    }
}

module.exports = ServicosRoute;