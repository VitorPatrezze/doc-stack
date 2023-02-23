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
    console.log("id token: " + idToken);
    console.log("access token: " + accessToken);
    sessionStorage.setItem("id_token", idToken);
    sessionStorage.setItem("access_token", accessToken);
});

/**
 * Takes the url parameters and extracts the field outhat matches the "param" 
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