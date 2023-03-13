$( document ).ready(function() {
  const result = getProfile();
});

async function getProfile() {
    const accessToken = sessionStorage.getItem("access_token");
    await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/doctor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth': 'eyJraWQiOiJlcHBFd3lCVGlmNk5YUm5qUE5iVnlMM0VIQ25Ra2F4ak9FRzhOd2RSMVlFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMmRkODIxMS1lMWMxLTQzNDAtYTU2Zi01MjNhNGMzYTQ3YjciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9idXZacEJVazQiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJrMm1rbHVjNTJxZzE4ZTd0Y20waHBwcDkxIiwiZXZlbnRfaWQiOiJjMzgwYTdhMC03NzRmLTRiMzAtOTk5OS05ODhkMmI2ODE1ODEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY3ODc0ODkzOSwiZXhwIjoxNjc4NzUyNTM5LCJpYXQiOjE2Nzg3NDg5MzksImp0aSI6IjgyZWExMzNiLWNhM2MtNDYwMC1hNGYzLTY2ZmNhNzE0ZDRjNCIsInVzZXJuYW1lIjoidGVzdGUifQ.tFuXmC7E5M1Xt5iQuYsMqpxu_-38C-PpDiHJSZaD9j31PVvw4ayS0SsuSCKKffBGTe_Ac28gvUoP7dz8MZB7vmkpUqSOPKpyMFuNtPcdihdPn1QdnRAqOKTmnbkchpVXQD8OD8EfrdZh_TlRnzM12rRCra20kcf_ogUkF1jFijUlWKxXKhsMa1SKS32z-1RxEbb1XOywQMzW9ZGB2_2Xlj33TLHYcD_OsOYpA-ESr9uWK9UJfl0s-MLoUWjtItytJVuDgpwuaaU_26AET1VDkT4J-4G9DoyHbYwV0KtOcJldjoTaNoltpUECaoeGxoOBUvbCGH7p8KmAlWMIB2aaWg'
      }
    })
    .then(response => response.json())
    .then(response => {
      let body = JSON.parse(response["body"])
      console.log(body)
      if (body["code"] == 403) {
        $("#profile-div").load("templates/register-doctor-form.html");  
      } else {
        profile = body["profile"][0]
        console.log(profile)
        $("#profile-div").load("templates/profile-info.html", (function() {
          document.getElementById("profile-name").innerHTML = profile["name"]
          document.getElementById("profile-specialty").innerHTML = profile["specialty"]
          document.getElementById("profile-crm").innerHTML = profile["crm"]
          document.getElementById("profile-state").innerHTML = profile["state"]
          document.getElementById("profile-birth").innerHTML = profile["birth"]
        }))
      }
    })
}