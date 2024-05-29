document.addEventListener("DOMContentLoaded", function() {


    var btnGravar = document.getElementById("btnGravarVeiculo");


    btnGravar.addEventListener("click", function() {
        gravarVeiculo();
    })
})

function gravarVeiculo() {

    limparErros();
    
    var modelo = document.getElementById("modelo");
    var marca = document.getElementById("marca");
    var ano = document.getElementById("ano");
    var kilometragem = document.getElementById("kilometragem");

    var listaErros = [];

    if(modelo.value == "" || modelo.value == undefined || modelo.value == null){
        listaErros.push("modelo");
    }
    
    if(marca.value == "" || marca.value == undefined || marca.value == null){
        listaErros.push("marca");
    }

    if(ano.value == "" || ano.value == undefined || ano.value == null){
        listaErros.push("ano");
    }

    if(kilometragem.value == "" || kilometragem.value == undefined || kilometragem.value == null){
        listaErros.push("kilometragem");
    }

    if(listaErros.length == 0){

        var data = {
            modelo: modelo.value,
            marca: marca.value,
            ano: ano.value,
            kilometragem: kilometragem.value
        };

        fetch('/veiculos/cadastrar', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
            if(r.ok) {
                modelo.value = "";
                marca.value = "";
                ano.value = "";
                kilometragem.value = "";

                document.getElementById("alertaSucesso").innerText = "Veiculo gravado com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao gravar Veiculo!";
                document.getElementById("erros").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}

function mostrarErros(lista) {
    for(var i = 0; i<lista.length; i++){
        let id = lista[i];

        document.getElementById(id).classList.add("campoErro");

        document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erros").style= "display:block";
    }
}

function limparErros() {
    document.getElementById("modelo").classList.remove("campoErro");
    document.getElementById("marca").classList.remove("campoErro");
    document.getElementById("ano").classList.remove("campoErro");
    document.getElementById("kilometragem").classList.remove("campoErro");

    document.getElementById("erros").style = "display:none";
    document.getElementById("alertaSucesso").style = "display:none";
}