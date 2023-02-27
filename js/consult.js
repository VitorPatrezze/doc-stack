function handleConsult(form) {
    const crm = form["crm"].value
    console.log(crm)
    const uri = form.id + '?crm=' + crm
    getData(uri)
}
  
async function getData(uri) {
    const accessToken = sessionStorage.getItem("access_token");
    await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/' + uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Auth': 'eyJraWQiOiJlcHBFd3lCVGlmNk5YUm5qUE5iVnlMM0VIQ25Ra2F4ak9FRzhOd2RSMVlFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MTg2YjU5Yi1jNmMzLTQwMDQtYWEzMC00MGYwMDZkZTdmODYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9idXZacEJVazQiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJrMm1rbHVjNTJxZzE4ZTd0Y20waHBwcDkxIiwiZXZlbnRfaWQiOiI5NzhjN2QxMC05M2ExLTQzZjgtOTkxNy01YzA2M2M0ZDY5N2QiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY3NzUzMDk1NCwiZXhwIjoxNjc3NTM0NTU0LCJpYXQiOjE2Nzc1MzA5NTQsImp0aSI6ImQ0MTRiNDI2LWQxYjctNDE0Ny1iMGYxLTNmODZlNjNjYjE0OSIsInVzZXJuYW1lIjoidGVzdGUyIn0.o8eknrkU3PB4YKOevhqG2P86kXZcaKBLvApW0UzgmC0H_R5VBhF3RS7D2ZsQgqF3PfE_7RpH3yvkzG2DYZZp412Wo39FWh1sFvVmHdC9_4A16l4U40RckJDWgpgB7rhM6hqWp-OCzbp2gzaCu9uFkxGAQiYkht-8P6s9Q52I2p6kXZvF-W8Srys7m85mm2SRVxdGfezzUecfiNHTW3OLJ5wJwN1RSqVo1Zj1YstyP5ThHQe63BDRCybV3zoZmeo7dbBmQf7orUnLiD0cd_WHiTALey3Cv3dA9APGXa5-uNz9s91znjGsbKyh_RdOr6IHIP2ThMfCAqMEHFD_g4OYpA'
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
  
  