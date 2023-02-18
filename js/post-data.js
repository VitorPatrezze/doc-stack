
function handleRequestClick(form) {
  console.log("id token: " + idToken);
  console.log("access token: " + accessToken);
  // var dict = {}
  // for (let i = 0; i < form.length; i++)
  // {
  //     dict[form.elements[i].name] = form.elements[i].value
  //     console.log(form.elements[i].value)
  // }
  // console.log("dict to post: " + dict)
  // postData(dict);
}

async function postData(form) {
  const path = '/dev/test';
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  };
  fetch("URL", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: `{
  "Id": 78912,
  "Customer": "Jason Sweet",
  "Quantity": 1,
  "Price": 18.00
  }`,
  });

  response.json().then(data => {
    console.log(data);
  });

  return await API.post(apiName, path, myInit);
}

const response = await fetch("https://reqbin.com/echo/post/json", {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: `{
 "Id": 78912,
 "Customer": "Jason Sweet",
 "Quantity": 1,
 "Price": 18.00
}`,
});

response.json().then(data => {
console.log(data);
});