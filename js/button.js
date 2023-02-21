function handleRequestClick(form) {
  var dict = {}
  for (let i = 0; i < form.length; i++) {
    dict[form.elements[i].name] = form.elements[i].value
  }
  postData(form.id, dict);
}

async function postData(uri, form) {

  const path = '/dev/test';
  const accessToken = sessionStorage.getItem("access_token");
  const idToken = sessionStorage.getItem("id_token");

  console.log(form);

  await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/' + uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth': accessToken
    },
    body: JSON.stringify(form)
  })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)));
}

