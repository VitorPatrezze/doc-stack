var idToken;
var accessToken;

$( document ).ready(function() {
    var pageURL = window.location.href;
    pageURL = pageURL.toString();

    // Gets url strings
    var paramIndex = pageURL.indexOf("#"); // When page is hosted on the web, use '?'
    if (paramIndex === -1) {
        return;
    }
    // Gets url parameters from AWS Cognito response including the 'access token'
    var parameters = pageURL.substring(paramIndex + 1);

    // Extracts the encoded tokens from url parameters
    idToken = getParameter(parameters, "id_token=");
    accessToken = getParameter(parameters, "access_token=");   
    sessionStorage.setItem("id_token", idToken);
    sessionStorage.setItem("access_token", accessToken);
});

/**
 * Takes the url parameters and extracts the field that matches the "param" 
 * input.
 * @param {type} url, contains URL parameters
 * @param {type} param, field to look for in url
 * @returns {unresolved} the param value.
 */
function getParameter(url, param) {
    var urlVars = url.split('&');
    var returnValue;
    for (var i = 0; i < urlVars.length; i++) {
        var urlParam = urlVars[i];

        // get up to index.
        var index = urlParam.toString().indexOf("=");
        urlParam = urlParam.substring(0, index + 1);
        if (param === urlParam) {
            returnValue = urlVars[i].replace(param, "");
            i = urlVars.length; // exits for loop
        }
    }
    return returnValue;
}

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