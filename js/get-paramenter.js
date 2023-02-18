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