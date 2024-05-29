const Database = require('../utils/database');

const conexao = new Database();

class ServicoModel {

    #serv_id;
    #serv_desc;
    #serv_valor;

    get serv_id(){
        return this.#serv_id;
    }

    set serv_id(serv_id) {
        this.#serv_id = serv_id;
    }

    get serv_desc(){
        return this.#serv_desc;
    }

    set serv_desc(serv_desc) {
        this.#serv_desc = serv_desc;
    } 
    
    get serv_valor(){
        return this.#serv_valor;
    }

    set serv_valor(serv_valor) {
        this.#serv_valor = serv_valor;
    } 
    
    constructor(serv_id, serv_desc, serv_valor){
        this.#serv_id = serv_id;
        this.#serv_desc = serv_desc;
        this.#serv_valor = serv_valor;
    }

    async listar() {
        let sql = "select * from tb_servicos";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new ServicoModel(row["serv_id"], row["serv_descricao"], row["serv_valor"]));
        }

        return listaRetorno;
    }

    // async getTodosServicosEVeiculos() {
    //     const query = `
    //       select PEP.serv_id, PEP.serv_descricao, E.vei_id 
    //       from (select P.serv_id, P.serv_descricao, EP.vei_id from tb_servicos as P 
    //         left join tb_servicosprestados as EP on P.serv_id = EP.serv_id) as PEP 
    //       left join tb_veiculos as E on PEP.vei_id = E.vei_id;
    //     `;
    //     let rows = await conexao.ExecutaComando(query);
    
    //     return rows.map(
    //       (row) =>
    //         new ServicoModel(
    //           row.serv_id,
    //           row.serv_descricao,
    //           row.vei_id
    //         )
    //     );
    // }

    async updateRelacionamentoPorId(vei_id) {
        if (vei_id) {
          //Atualiza alocação
          //Atualiza relacionamento entre o patrimonio e evento
          const queryAtualizarRelacionamento =
            "update tb_servicosprestados set vei_id = ? where serv_id = ?";
          const valuesAtualizarRelacionamento = [vei_id, this.#serv_id];
          const isUpdatedRelacionamento = await conexao.ExecutaComandoNonQuery(
            queryAtualizarRelacionamento,
            valuesAtualizarRelacionamento
          );
    
          return isUpdatedRelacionamento;
        }
      }
    
      async alocarServico(serv_id, vei_id) {
    
        const queryAddAlocacao =
          "insert into tb_servicosprestados (serv_id, vei_id) values (?, ?)";
        const valuesAddAlocacao = [serv_id, vei_id];
    
        let isAdded = await conexao.ExecutaComandoNonQuery(
          queryAddAlocacao,
          valuesAddAlocacao
        );
    
        return isAdded;
      }

      
    

}

module.exports = ServicoModel;