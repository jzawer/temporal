import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '0a97e016-4618-4a40-b28c-7fd9c8f279db',
    authority: 'https://login.microsoftonline.com/common/',
    redirectUri: 'http://localhost:5173',
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export default msalInstance;
