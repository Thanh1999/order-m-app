import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

export const configAmplify = () => {
    Amplify.configure({
        Auth: {
            // REQUIRED - Amazon Cognito Region
            region: `${awsExports.REGION}`,

            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: `${awsExports.USER_POOL_ID}`,

            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: `${awsExports.USER_POOL_APP_CLIENT_ID}`,

            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: false,

            // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
            // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
            signUpVerificationMethod: 'code', // 'code' | 'link'

            // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
            authenticationFlowType: 'USER_PASSWORD_AUTH',

            // OPTIONAL - Hosted UI configuration
            oauth: {
                domain: `${awsExports.AUTH_DOMAIN}.auth.${awsExports.REGION}.amazoncognito.com`,
                scope: [
                    'order-api/auth_order',
                    'profile',
                    'openid',
                ],
                redirectSignIn: 'http://localhost:3000/',
                redirectSignOut: 'http://localhost:3000/',
                responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
                clientID: `${awsExports.USER_POOL_APP_CLIENT_ID}`,
            },
        },

        API: {
            endpoints: [
                {
                    name: "OrderAPIGatewayAPI",
                    endpoint: `${awsExports.API_ENDPOINT}`,
                },
            ]
        }
    });
}


