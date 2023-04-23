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
  //TESTES para vários CRM
  profile["crm"] = [
    {"crm": 123456, "state": "SP"},
    {"crm": 654321, "state": "MG"},
    {"crm": 111111, "state": "BA"},
    {"crm": 222222, "state": "RJ"},
    {"crm": 333333, "state": "SC"},
    {"crm": 444444, "state": "PE"}
  ]

  crmdiv = document.getElementById("crm-container")

  profile["crm"].forEach(registro => {
    //<div class="profile-info-value" ><span id="profile-state"></span> <span id="profile-crm"></span></div>
    //Add graph element
    var id = "crm" + registro["crm"]
    
    const tempDiv = document.createElement("div");
    tempDiv.className = "col crm-div";

    const tempValue = document.createElement("div");
    tempValue.className = "profile-info-value";
    tempValue.id = id
    const tempState = document.createElement("label");
    tempState.for = id 
    


    tempState.innerHTML = "CRM " + registro["state"]
    tempValue.innerHTML = registro["crm"]

    tempDiv.insertAdjacentElement("beforeend", tempValue)
    tempDiv.insertAdjacentElement("beforeend", tempState)
    crmdiv.insertAdjacentElement("beforeEnd", tempDiv)
  });

  document.getElementById("profile-name").innerHTML = profile["name"]
  document.getElementById("profile-specialty").innerHTML = profile["specialty"]
  // document.getElementById("profile-crm").innerHTML = profile["crm"]
  // document.getElementById("profile-state").innerHTML = profile["state"]
  document.getElementById("profile-birth").innerHTML = profile["birth"]
  document.getElementById("profile-inscription-date").innerHTML = profile["inscription_date"]
  console.log("templates/profile/" + profile["specialty"] + ".html")
  $("#specialty-info").load("templates/profile/" + profile["specialty"] + ".html", () => fillSpecialtyInfo(profile))
}

//FALTA FAZER O PREENCHIMENTO DAS INFORMACOES ESPECIFICAS DA ESPECIALIDADE
function fillSpecialtyInfo(profile) {
  // buscar todos os elementos dentro do html que terão gráficos e chamar o "newChart" para criar os graficos dentrod e cada um deles

  createCharts(profile)
}