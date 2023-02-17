/*global WildRydes _config*/

var authToken;

(function requestScopeWrapper($) {
    authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/index.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/index.html';
    });
    function makeRequest(form) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/dev/test',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify(form),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error posting form: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when posting your form:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        $(WildRydes.map).on('pickupChange', handlePickupChanged);

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handleRequestClick(event) {
        alert(event)
        event.preventDefault();
        makeRequest(event);
    }

}(jQuery));
