
// import { Auth } from 'aws-amplify';

// Auth.currentSession()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));


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
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  };

  return await API.post(apiName, path, myInit);
}