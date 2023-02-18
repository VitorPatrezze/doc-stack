$( document ).ready(function() {
    var pageURL = window.location.href;
    pageURL = pageURL.toString();
    console.log(" page url: " + pageURL);

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
});
