document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnExportarExcel").addEventListener('click', exportarExcel);

    let itemFiltro = document.querySelectorAll(".itemFiltro");

    let filtroEscolhido = 0;

    document.getElementById("btnFiltrar").addEventListener('click', buscar);

    for(let i = 0; i<itemFiltro.length; i++){
        itemFiltro[i].addEventListener("click", mudarCriterioFiltragem);
    }

    function exportarExcel(){
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaServicos"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "servicos.xlsx");
    }

    function mudarCriterioFiltragem(){
        let nome = this.dataset.nome;
        document.getElementById("btnEscolherFiltro").innerText = nome;
        filtroEscolhido = this.dataset.valor;
    }

    function buscar(){
        let termoFiltro = document.getElementById("filtro").value;

        if(termoFiltro == ""){
            termoFiltro = "todos";
        }

        fetch(`/veiculos/filtrar/${termoFiltro}/${filtroEscolhido}`)
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            console.log(r);
            if(r.length > 0){
                let htmlCorpo = "";
                for(let i =0; i<r.length; i++){
                    htmlCorpo += `
                        <tr>
                            <td>${r[i].serv_id}</td>
                            <td>${r[i].vei_id}</td>
                        </tr>
                    `;
                }
                document.querySelector("#tabelaServicos > tbody").innerHTML = htmlCorpo;
            }
        })
    }

})