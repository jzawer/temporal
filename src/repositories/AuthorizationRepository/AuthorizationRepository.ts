import type { IResource } from './../interfaces/IResource';
import HttpRepository from '@/repositories/baseRepository/httpResository';
import AuthorizationResource from './AuthorizationResource';
import type Permission from '@/entities/Permission';

class AuthorizationRepository extends HttpRepository<unknown> {
  constructor(resource: IResource) {
    super(resource);
  }

  getPermissions(): Promise<Array<Permission>> {
    return this.httpClient.get(this.resourceUrl + 'permissions');
  }
}

export default new AuthorizationRepository(AuthorizationResource);
