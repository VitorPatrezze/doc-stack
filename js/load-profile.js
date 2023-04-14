$( document ).ready(function() {
  const result = getProfile();
});

async function getProfile() {
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
      $("#profile-div").load("templates/register-doctor-form.html");  
    } else {
      profile = body["profile"]
      console.log(profile)
      $("#profile-div").load("templates/profile/profile-info.html", () => basicInfo(profile))
    }
  })
}

function basicInfo(profile) {
  document.getElementById("profile-name").innerHTML = profile["name"]
  document.getElementById("profile-specialty").innerHTML = profile["specialty"]
  document.getElementById("profile-segment").innerHTML = profile["segment"]
  document.getElementById("profile-crm").innerHTML = profile["crm"]
  document.getElementById("profile-state").innerHTML = profile["state"]
  document.getElementById("profile-birth").innerHTML = profile["birth"]
  console.log("templates/profile/" + profile["specialty"] + ".html")
  $("#specialty-info").load("templates/profile/" + profile["specialty"] + ".html", () => fillSpecialtyInfo(profile))
}

//FALTA FAZER O PREENCHIMENTO DAS INFORMACOES ESPECIFICAS DA ESPECIALIDADE
function fillSpecialtyInfo(profile) {
}