function handleRequestClick(form) {
    var dict = {}
    for (let i = 0; i < form.length; i++)
    {
        dict[form.elements[i].name] = form.elements[i].value
    }
    postData(dict);
}

async function postData(form) {

  const path = '/dev/test';
  const accessToken = sessionStorage.getItem("access_token");
  const idToken = sessionStorage.getItem("id_token");

  fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': idToken
    },
    body: JSON.stringify(form)
  })
    .then(response => console.log(JSON.stringify(response)))

  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", "https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/test");
  // xhr.setRequestHeader("Authorization", idToken);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // console.log("Teste");
  // console.log(xhr);
  // xhr.send(JSON.stringify(form));

  // const myInit = {
  //   headers: {
  //     Authorization: `Auth ${accessToken}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: form
  // };

  // console.log(myInit);
  //return await API.post(apiName, path, myInit);
}

