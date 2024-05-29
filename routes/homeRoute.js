const express = require('express');
const HomeController = require('../controllers/homeController');
const Autenticacao = require('../middlewares/autenticacao');

class HomeRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new HomeController();
        let auth = new Autenticacao();
        this.#router.get('/', auth.usuarioEstaLogado, ctrl.homeView);
        
        this.#router.get('/nao-autorizado', ctrl.naoAutorizadoView);
    }
}

module.exports = HomeRoute;