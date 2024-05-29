
class HomeController {

    constructor() {

    }
    
    homeView(req, res){
        res.render('home/index', {  });
    }

    naoAutorizadoView(req, res) {
        res.render('home/nao-autorizado', { layout: 'home/nao-autorizado' });
    }

}
module.exports = HomeController;