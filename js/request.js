/*global _config*/
import { Amplify, API } from 'aws-amplify';
Amplify.configure(awsconfig);

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
var authToken;

// function makeRequest(form) {
//     authToken.then(function setAuthToken(token) {
//         if (token) {
//             authToken = token;
//         } else {
//             window.location.href = '/index.html';
//         }
//     }).catch(function handleTokenError(error) {
//         alert(error);
//         window.location.href = '/index.html';
//     });
//     alert(authToken)
//     $.ajax({
//         method: 'POST',
//         url: _config.api.invokeUrl + '/dev/test',
//         headers: {
//             Authorization: authToken
//         },
//         data: JSON.stringify(form),
//         contentType: 'application/json',
//         success: completeRequest,
//         error: function ajaxError(jqXHR, textStatus, errorThrown) {
//             console.error('Error posting form: ', textStatus, ', Details: ', errorThrown);
//             console.error('Response: ', jqXHR.responseText);
//             alert('An error occured when posting your form:\n' + jqXHR.responseText);
//         }
//     });
// }

function handleRequestClick(form) {
    var dict = {}
    for (let i = 0; i < form.length; i++)
    {
        dict[form.elements[i].name] = form.elements[i].value
        console.log(form.elements[i].value)
    }
    postData(dict);
}
