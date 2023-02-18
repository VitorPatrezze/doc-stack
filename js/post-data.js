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

  console.log(" page url: " + pageURL);
  console.log(" url parameters: " + parameters);

  // Extracts the encoded tokens from url parameters
  var idToken = getParameter(parameters, "id_token=");
  var accessToken = getParameter(parameters, "access_token=");
  console.log("id token: " + idToken);
  console.log("access token: " + accessToken);

  // Decodes the tokens
  var idTokenDecoded = atob(idToken.split('.')[1]);
  var accessTokenDecoded = atob(accessToken.split('.')[1]);
  console.log("id token decoded: " + idTokenDecoded);
  console.log("access token decoded: " + accessTokenDecoded);

  // Converts string tokens to JSON
  var idTokenJson = JSON.parse(idTokenDecoded);
  var accessTokenJson = JSON.parse(accessTokenDecoded);

  // Can now access the fields as such using the JSON.parse()
  console.log("email: " + idTokenJson.email);
  console.log("id: " + idTokenJson.sub);
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

//-------------------------------------

// async function postData(form) {
//   const apiName = 'MyApiName';
//   const path = '/path';
//   const myInit = {
//     headers: {
//       Authorization: `Bearer ${(await Auth.currentSession())
//         .getIdToken()
//         .getJwtToken()}`
//     }
//   };

//   return await API.post(apiName, path, myInit);
// }