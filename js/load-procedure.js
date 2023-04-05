$( document ).ready(function() {
  // Pegar informações da URL para inserir no formulário
  let params = new URLSearchParams(location.search);
  procedureInfo = params.get("procedure_info");
  specialty = sessionStorage.getItem("specialty");
  loadForm(procedureInfo, specialty);
});


function loadForm(procedureInfoStr, specialty) {
  // Carregar formulário de acordo com especialidade do médico e com as informações básicas do procedimento
  procedureInfo = JSON.parse(procedureInfoStr);
  console.log(procedureInfo);
  $("#form-container").load("templates/specific-forms/" + specialty + ".html", () => fillProcedureInfo(procedureInfo));
}

function fillProcedureInfo(procedureInfo) {
  document.getElementById("initials").value = procedureInfo.initials
  document.getElementById("hospital").value = procedureInfo.hospital
  document.getElementById("ocurred_at").value = procedureInfo.ocurred_at
  document.getElementById("detail").value = procedureInfo.detail
}