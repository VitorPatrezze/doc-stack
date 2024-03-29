function searchProcedure(form) {
  var dict = {};
  const l = form.length;
  for (let i = 0; i < l; i++) {
    if (form.elements[i].type === "checkbox") {
      if (form.elements[i].checked) {
        dict = createArray(dict, form.elements[i]);
        dict[form.elements[i].parentNode.id] += (form.elements[i].value)
      }
    } else {
      let name = form.elements[i].name
      if (name == "") {

      } else if (isNaN(form.elements[name].value)) {
        dict[name] = form.elements[name].value //if it's not a number, just put the value
      } else {
        dict[name] = (form.elements[name].value * 1) //if it's a number, parse as number 
      }
    }
  }
  retrieveProcedure(form.id, dict)
}

async function retrieveProcedure(uri, dict) {
  const accessToken = sessionStorage.getItem("access_token");

  await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/' + uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth': accessToken
    },
    body: JSON.stringify(dict)
  })
    .then(response => response.json())
    .then(response => {
      const body = JSON.parse(response["body"])
      let code = body['code']
      if (code == 0) {
        loadCreateProcedureBlock(dict)
      } else if (code == 1) {
        procedures = body['result']
        loadProcedures(procedures)
        loadCreateProcedureBlock(dict)
      }
    })
}

function createArray(dict, element) {
  const name = element.parentNode.id;
  if (!(name in dict)) {
    dict[name] = ""
  } else {
    dict[name] += ", "
  }
  return dict
}

function loadCreateProcedureBlock(dict) {
  $("#create-procedure-container").load("templates/procedure-forms/create-procedure-form.html", (function() {
    document.getElementById("new-procedure-initials").value = dict['initials']
    document.getElementById("new-procedure-hospital").value = dict['hospital']
    document.getElementById("new-procedure-date").value = dict['date']
  }));
}

function loadProcedures(procedures) {
  document.getElementById("procedures-container").style.display = "block";
  tableBody = document.getElementById("table-body")
  tableBody.innerHTML=""
  for (var i = 0; i < procedures.length; i++) {
    var procedureInfo = new Object()
    procedureInfo.id = procedures[i]["id"]
    procedureInfo.initials = procedures[i]["initials"];
    procedureInfo.hospital = procedures[i]["hospital"];
    procedureInfo.ocurred_at = procedures[i]["ocurred_at"];
    procedureInfo.detail = procedures[i]["detail"];

    var row = tableBody.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    cell1.innerHTML = procedureInfo.initials;
    cell2.innerHTML = procedureInfo.hospital;
    cell3.innerHTML = procedureInfo.ocurred_at;
    cell4.innerHTML = procedureInfo.detail;

    let btn = document.createElement("button")
    btn.innerHTML = "Selecionar"
    btn.type = "button"
    btn.value = JSON.stringify(procedureInfo)
    btn.className = "btn btn-primary"
    btn.addEventListener("click", () => selectProcedure(btn.value))
    cell5.appendChild(btn)
  }
}

function selectProcedure(procedureInfoStr) {
  let queryParams = "";
  procedureInfo = JSON.parse(procedureInfoStr)
  Object.keys(procedureInfo).forEach(function(k){
    queryParams += k + "=" + procedureInfo[k] + "&"
  })

  window.location.href = "/form.html?" + queryParams
}