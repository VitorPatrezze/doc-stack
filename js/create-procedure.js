function createProcedure(form) {
    let dict = createDict(form)
    console.log(dict)
    const accessToken = sessionStorage.getItem("access_token");
    fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/create-procedure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth': accessToken
      },
      body: JSON.stringify(dict)
    })
    .then(response => response.json())
    .then(response => console.log(response))
}

function createDict(form) {
    var dict = {};
    const l = form.length;
    for (let i = 0; i < l; i++) {
        if (form.elements[i].type === "checkbox") {
        if (form.elements[i].checked) {
            dict = createArray(dict, form.elements[i]);
            dict[form.elements[i].parentNode.id] += (form.elements[i].value)
        }
        } else {
            let name = form.elements[i].name
            if (name == "") {

            } else if (isNaN(form.elements[name].value)) {
                dict[name] = form.elements[name].value //if it's not a number, just put the value
            } else {
                dict[name] = (form.elements[name].value * 1) //if it's a number, parse as number 
            }
        }
    }
    return dict
}
