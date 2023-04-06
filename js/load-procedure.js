$( document ).ready(function() {
  // Pegar informações da URL para inserir no formulário
  let params = new URLSearchParams(location.search);
  specialty = sessionStorage.getItem("specialty");
  loadForm(params, specialty);
});


function loadForm(params, specialty) {
  // Carregar formulário de acordo com especialidade do médico e com as informações básicas do procedimento
  console.log(params);
  $("#form-container").load("templates/specific-forms/" + specialty + ".html", () => fillProcedureInfo(params));
}

function fillProcedureInfo(params) {
  document.getElementById("id").value = params.get("id");
  document.getElementById("initials").value = params.get("initials");
  document.getElementById("hospital").value = params.get("hospital");
  document.getElementById("ocurred_at").value = params.get("ocurred_at");
  document.getElementById("detail").value = params.get("detail");
}