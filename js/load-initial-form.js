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
        $("#form-container").load("templates/not-a-doctor.html");  
      } else {
        profile = body["profile"][0]
        console.log(profile)
        if (profile['segment'] == "clinic") {
          $("#form-container").load("templates/initial-appointment-form.html");
        } else {
          $("#form-container").load("templates/initial-surgery-form.html");
        }
      }
    })
}