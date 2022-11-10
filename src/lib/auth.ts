import type Permission from '@/entities/Permission';
import generateAbilities from '@/lib/authorization';
import AuthorizationRepository from '@/repositories/AuthorizationRepository/AuthorizationRepository';
import * as msal from '@azure/msal-browser';
import type { AnyMongoAbility } from '@casl/ability';
import httpClient from '@/lib/httpClient';

const msalConfig = {
  auth: {
    clientId: '0a97e016-4618-4a40-b28c-7fd9c8f279db',
    authority:
      'https://login.microsoftonline.com/923c1e44-a932-4c8e-b1d7-b58788afa8f0/',
    redirectUri: 'http://localhost:5173/',
  },
};

class Authentication extends msal.PublicClientApplication {
  private _lastAuthenticationResult!: msal.AuthenticationResult | null;

  constructor(config: msal.Configuration) {
    super(config);
  }

  get activeAccount(): msal.AccountInfo | null {
    return this.getActiveAccount();
  }

  async checkForActiveAccount(): Promise<void> {
    const redirectPromise = await this.handleRedirectPromise();
    if (redirectPromise) {
      this.setActiveAccount(redirectPromise.account);
      await this.setAuthorizationToken(redirectPromise);
    } else if (this.activeAccount) {
      const token = await this.acquireTokenSilent({
        account: this.activeAccount,
      } as msal.SilentRequest);
      await this.setAuthorizationToken(token);
    }
  }

  async doLogin(): Promise<any> {
    await this.loginRedirect({
      scopes: ['api://a3537053-d976-4278-9b48-35af70728663/Contact.View'],
    });
  }

  async doLogout(): Promise<void> {
    await this.logoutRedirect({
      onRedirectNavigate: () => {
        // Return false if you would like to stop navigation after local logout
        return false;
      },
    });
  }

  async getActiveAccountAbilities(): Promise<AnyMongoAbility> {
    let permissions = [] as Array<Permission>;

    try {
      if (this.activeAccount)
        permissions = await AuthorizationRepository.getPermissions();
    } catch {
      console.log('hola');
    }
    return generateAbilities(permissions);
  }

  async setAuthorizationToken(token: msal.AuthenticationResult): Promise<void> {
    httpClient.defaults.headers.common[
      'Authorization'
    ] = `${token.tokenType} ${token.accessToken}`;
  }
}

export default new Authentication(msalConfig);
