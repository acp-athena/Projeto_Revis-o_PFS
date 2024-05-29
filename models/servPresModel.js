const Database = require('../utils/database');
const Criptografia = require('../utils/criptografia');

const conexao = new Database();

class ServPresModel {

    #sepr_id;
    #serv_id;
    #vei_id;

    get sepr_id(){
        return this.#sepr_id;
    }

    set sepr_id(sepr_id) {
        this.#sepr_id = sepr_id;
    }

    get serv_id(){
        return this.#serv_id;
    }

    set serv_id(serv_id) {
        this.#serv_id = serv_id;
    } 
    
    get vei_id(){
        return this.#vei_id;
    }

    set vei_id(vei_id) {
        this.#vei_id = vei_id;
    } 
    
    constructor(sepr_id, serv_id, vei_id){
        this.#sepr_id = sepr_id;
        this.#serv_id = serv_id;
        this.#vei_id = vei_id;
    }

    async listarFiltro(termo, filtro) {

        let sqlFiltro = "";
        if(termo != "") {
            if(filtro == "2") {
                sqlFiltro = ` where serv_id = ?`
            }
            else if(filtro == "1") {
                sqlFiltro = ` where vei_id = ?`;
            }
        }

        let sql = `select * from tb_servicosprestados ${sqlFiltro}`;
        let valores = [];

        if(sqlFiltro != ""){
            valores.push(termo);
        }

        
        let rows = await conexao.ExecutaComando(sql, valores);
        let listaServ = [];

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaServ.push(new ServPresModel(row["sepr_id"], row["serv_id"], row["vei_id"]));
        }

        return listaServ;
    }

    async listarInfo() {

        let sql = "select * from tb_servicosprestados";
        let listaServ = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaServ.push(new ServPresModel(row["sepr_id"], row["serv_id"], row["vei_id"]));
        }

        return listaServ;
    }

    toJSON(){
        return {
            "sepr_id": this.#sepr_id,
            "serv_id": this.#serv_id,
            "vei_id": this.#vei_id  
        }
    }

}

module.exports = ServPresModel;