$( document ).ready(function() {
  const result = loadInitialForm();
});

async function loadInitialForm() {
    const accessToken = sessionStorage.getItem("access_token");
    await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/doctor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth': accessToken
      }
    })
    .then(response => response.json())
    .then(response => {
      let body = JSON.parse(response["body"])
      if (body["code"] == 403) {
        $("#query-container").load("templates/not-a-doctor.html");  
      } else {
        profile = body["profile"][0]
        console.log(profile)
        $("#query-container").load("templates/procedure-forms/initial-procedure-form.html", (function() {
          segment = profile['segment']
          sessionStorage.setItem("segment", segment);
          var placeholder = ((segment == "clinic") ? "Consulta" : "Cirurgia");
          document.querySelector("input[id='segment-placeholder']").value = placeholder;
          document.querySelector("input[id='segment']").value = segment;
        }))
      }
    })
}