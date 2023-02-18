function handleRequestClick(form) {
    var dict = {}
    for (let i = 0; i < form.length; i++)
    {
        dict[form.elements[i].name] = form.elements[i].value
        console.log(form.elements[i].value)
    }
    postData(dict);
}

async function postData(form) {
  const apiName = 'MyApiName';
  const path = '/path';
  const idToken = sessionStorage.getItem("id_token");
  const accessToken = sessionStorage.getItem("access_token");
  console.log("access token: " + accessToken);
  const myInit = {
    headers: {
      Authorization: `Auth ${accessToken}`
    },
    body: form
  };

  console.log(myInit);
  //return await API.post(apiName, path, myInit);
}