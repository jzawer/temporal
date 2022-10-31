import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "",
    authority: "https://login.microsoftonline.com/common/",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export default msalInstance;
