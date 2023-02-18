import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

window._config = {
    cognito: {
        userPoolId: 'us-east-1_buvZpBUk4', // e.g. us-east-1_wBwgdLjXz
        userPoolClientId: 'k2mkluc52qg18e7tcm0hppp91', // e.g. 7bql9c29vibdtpm2ahcm64sl28
        region: 'us-east-1' // e.g. us-east-2
    },
    api: {
        invokeUrl: 'https://tmaqjddwt8.execute-api.us-east-1.amazonaws.com/dev' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
    }
};


Amplify.configure(awsconfig);


// Amplify.configure({
//     // OPTIONAL - if your API requires authentication 
//     Auth: {
//         identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', // REQUIRED - Amazon Cognito Identity Pool ID
//         region: 'us-east-1', // REQUIRED - Amazon Cognito Region
//         userPoolId: 'us-east-1_buvZpBUk4', // OPTIONAL - Amazon Cognito User Pool ID
//         userPoolWebClientId: 'k2mkluc52qg18e7tcm0hppp91', // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     },
//     API: {
//         endpoints: [
//             {
//                 name: "MyAPIGatewayAPI",
//                 endpoint: "https://1234567890-abcdefgh.amazonaws.com"
//             },
//             {
//                 name: "MyCustomCloudFrontApi",
//                 endpoint: "https://api.my-custom-cloudfront-domain.com",

//             }
//         ]
//     }
// });