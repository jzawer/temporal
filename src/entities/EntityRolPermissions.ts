import type Permission from './Permission';

interface EntityRolPermissions {
  entityId: string;
  permissions: Array<Permission>;
}

export default EntityRolPermissions;
