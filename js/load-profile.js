$( document ).ready(function() {
    const accessToken = sessionStorage.getItem("access_token");
    const info = getProfile(accessToken)
});


async function getProfile(accessToken) {
  
    await fetch('https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev/doctors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth': accessToken
      }
    })
      .then(response => response.json())
      .then(console.log(response))
}