function handleRequestClick(form) {
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
        dict[form.elements[i].name] = form.elements[i].value
      } else {
        dict[form.elements[i].name] = (form.elements[i].value * 1)
      }
    }
  }
  postData(form.id, dict).then(
      window.location.href = "https://main.d3koga650buw25.amplifyapp.com/home"  
  )
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
    .then(response => console.log(JSON.stringify(response)));
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

