$( document ).ready(function() {
  // Pegar informações da URL para inserir no formulário
  let params = new URLSearchParams(location.search);
  procedureId = params.get("procedure_id");
  specialty = sessionStorage.getItem("specialty");
  loadForm(procedureId, specialty);
});


function loadForm(procedureId, specialty) {
  // Carregar formulário de acordo com especialidade do médico e com as informações básicas do procedimento
  console.log(specialty);
  $("#form-container").load("templates/specific-forms/" + specialty + ".html");
}