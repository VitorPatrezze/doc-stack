function profile() {
    getProfile();
}

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
      .then(response => console.log(response))
}