import { Amplify, API } from 'aws-amplify';
Amplify.configure(awsconfig);

async function postData(form) {
  const apiName = 'MyApiName';
  const path = '/path';
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  };

  return await API.post(apiName, path, myInit);
}