function handleConsult(form) {
    const crm = form["crm"].value
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
        .then((data) => {
            const body = JSON.parse(data["body"])
            const rows = body["rows"]
            console.log
            for (var i = 0; i < rows.length; i++) {
                tableBody = document.getElementById("table-main")
                var row = tableBody.insertRow(-1);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = i;
                cell2.innerHTML = rows[i]["diagnosis"];
                cell3.innerHTML = rows[i]["anesthesia"];
                cell4.innerHTML = rows[i]["duration"];
            }
        })
}
  
  