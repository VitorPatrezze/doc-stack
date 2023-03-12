function getProcedure(form) {
  var dict = {};
  const l = form.length;
  for (let i = 0; i < l; i++) {
    if (form.elements[i].type === "checkbox") {
      if (form.elements[i].checked) {
        dict = createArray(dict, form.elements[i]);
        dict[form.elements[i].parentNode.id] += (form.elements[i].value)
      }
    } else {
      if (form.elements[i].name == "") {
        
      } else if (isNaN(form.elements[i].value)) {
        dict[form.elements[i].name] = form.elements[i].value //if it's not a number, just put the value
      } else {
        dict[form.elements[i].name] = (form.elements[i].value * 1) //if it's a number, parse as number 
      }
    }
  }
  postData(form.id, dict)
}

async function postData(uri, dict) {
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
    .then((data) => {
        const body = JSON.parse(data["body"])
        const rows = body["result"]
        tableBody = document.getElementById("table-main")
        for (var i = 0; i < rows.length; i++) {
            var row = tableBody.insertRow(-1);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = i;
            cell2.innerHTML = rows[i]["initials"];
            cell3.innerHTML = rows[i]["hospital"];
            cell4.innerHTML = rows[i]["ocurred_at"];
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

