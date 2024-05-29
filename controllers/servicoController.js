const ServicoModel = require("../models/servicoModel");
const VeiculoModel = require("../models/veiculoModel");
const ServPresModel = require("../models/servPresModel");

class ServicoController {

    constructor() {

    }
    
    async listarView(req, res){
        var serv = new ServicoModel();
        var lista = await serv.listar();
        res.render('servicos/listar', { lista: lista  });
    }

    //FILTRO FEITO PARA LISTAR OS SERVIÇOS JÁ FEITOS
    async filtrar(req, res){
      let termo = req.params.termo;
      let filtro = req.params.filtro;
      let servPres = new ServPresModel();
      var lista = await servPres.listarFiltro(termo, filtro);

      res.send(lista);
  }

    async listarInformacaoView(req, res){

      var serv = new ServPresModel();
      var lista = await serv.listarInfo();

      res.render('veiculos/informacao', { lista: lista  });
  }

  //ALOCAÇÃO DE SERVIÇO
    async alocarView(req, res){
        var serv = new ServicoModel();
        var lista = await serv.listar();

        var vei = new VeiculoModel()
        var listaVeiculo = await vei.listar();

        res.render('Servicos/alocar', { lista: lista, listaVeiculo: listaVeiculo });
    }

    // async getTodosServicos(req, res) {
    //     let servicosModel = new ServicoModel();
    //     let servicos = await servicosModel.getTodosServicosEVeiculos();
    
    //     if (servicos && servicos.length) {
    //       res.send({
    //         ok: true,
    //         data: servicos,
    //       });
    //       return;
    //     }
    
    //     res.send({
    //       ok: false,
    //       data: null,
    //     });
    //   }

      async editarServicos(req, res) {
        const { servicos, veiculo } = req.body;
        const id = req.params.id;
        let servicosModel = new ServicoModel(id, servicos);
        let isUpdated = await servicosModel.updateRelacionamentoPorId(veiculo);
    
        if (isUpdated) {
          res.send({
            ok: true,
            message: "Serviço alterado com sucesso!",
          });
          return;
        }
        res.send({
          ok: false,
          message: "Não foi possível alterar serviço",
        });
      }

      async alocarServico(req, res) {
        const { servico, veiculo } = req.body;
    
        if (servico !== "0" && veiculo !== "0") {
          let servicoModel = new ServicoModel();
          let isAlocated = await servicoModel.alocarServico(servico, veiculo);
    
          if (isAlocated) {
            res.send({
              ok: true,
              message: "Serviço alocado ao veiculo com sucesso!",
            });
            return;
          }
          res.send({
            ok: false,
            message: "Não foi possível alocar patrimonio ao veiculo!",
          });
          return;
        }
        res.send({
          ok: false,
          message: "Serviço e veiculo obrigatórios para alocação!",
        });
      }

}
module.exports = ServicoController;