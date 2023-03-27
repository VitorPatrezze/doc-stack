$( document ).ready(function() {
  // Pegar informações da URL para inserir no formulário
  let params = new URLSearchParams(location.search);
  procedureId = params.get("procedure_id");
  specialty = sessionStorage.getItem("specialty");
  loadForm(procedureId, segment);
});


function loadForm(procedureId, segment) {
  // Carregar formulário de acordo com especialidade do médico e com as informações básicas do procedimento
  $("#form-container").load("templates/specific-forms/" + specialty + ".html");
}