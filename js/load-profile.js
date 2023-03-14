$( document ).ready(function() {
  const result = getProfile();
});

async function getProfile() {
    const accessToken = sessionStorage.getItem("access_token");
    await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/doctor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth': accessToken
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