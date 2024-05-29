const express = require('express');
const Autenticacao = require('../middlewares/autenticacao');
const VeiculoController = require('../controllers/veiculoController');
const ServicoController = require('../controllers/servicoController');

class VeiculosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new VeiculoController
        let auth = new Autenticacao();
        let serv = new ServicoController;
        this.#router.get('/', auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/cadastrar', auth.usuarioEstaLogado, ctrl.cadastrarView);
        this.#router.post('/cadastrar', auth.usuarioEstaLogado, ctrl.cadastroVeiculo);
        this.#router.get('/informacao', auth.usuarioEstaLogado, serv.listarInformacaoView);
        this.#router.get('/filtrar/:termo/:filtro', auth.usuarioEstaLogado, serv.filtrar);
    }
}

module.exports = VeiculosRoute;