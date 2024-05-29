document.addEventListener("DOMContentLoaded", function () {
    $("select").on("focus", function () {
      $(this).css("border-color", "#dee2e6");
      $("p", $(this).parent()).remove();
    });
  
    $("#servico-form").on("submit", function (e) {
      e.preventDefault();
      $("p.text-danger").remove();
      const servico = $("#servico").val();
      const veiculo = $("#veiculo").val();
  
      const body = {
        servico,
        veiculo,
      };
  
      if (validaFormulario(servico, veiculo)) {
        fetch(`/servicos/alocar`, {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r) =>
          r.json().then((r) => {
            alert(r.message);
            if (r.ok) {
              window.location.href = "/servicos/listar";
            }
          })
        );
      }
    });
  
    const validaFormulario = (servico, veiculo) => {
      let inputsComErro = [];
  
      if (servico === "0") {
        inputsComErro.push({
          selector: "#servico",
          errorMessage: "Campo obrigatório",
        });
      }
  
      if (veiculo === "0") {
        inputsComErro.push({
          selector: "#veiculo",
          errorMessage: "Campo obrigatório",
        });
      }
  
      if (inputsComErro.length) {
        inputsComErro.forEach((input) => {
          let inputElement = $(input.selector);
          inputElement.css("border-color", "red");
          inputElement
            .parent()
            .append(`<p class="text-danger">${input.errorMessage}</p>`);
        });
        return false;
      }
      return true;
    };
  });
  