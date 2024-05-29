const VeiculoModel = require("../models/veiculoModel");
const Criptografia = require("../utils/criptografia");


class VeiculoController {

    constructor() {

    }
    
    async listarView(req, res){
        var vei = new VeiculoModel()
        var lista = await vei.listar();
        res.render('veiculos/listar', { lista: lista  });
    }

    async cadastrarView(req, res) {
        res.render('veiculos/criar');
    }

    async cadastroVeiculo(req, res) {

        let ok = false;
        if(req.body != null) {
            if(req.body.modelo != null && req.body.marca != null && req.body.ano != null && req.body.kilometragem != null) {
                    let veiculo = new VeiculoModel(0, req.body.modelo, req.body.marca, req.body.ano, req.body.kilometragem);
                    ok = veiculo.gravarVeiculo();
            }
        }

        res.send({ ok: ok})
    }

}
module.exports = VeiculoController;