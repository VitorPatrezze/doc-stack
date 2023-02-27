function handleRequestClick(form) {
    const crm = form["param"]
    const uri = form.id + '?crm=' + crm
    getData(uri)
}
  
async function getData(uri) {
    const accessToken = sessionStorage.getItem("access_token");
    await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/' + uri, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Auth': accessToken
        }
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)));
}
  
  