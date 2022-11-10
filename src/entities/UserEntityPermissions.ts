import type EntityRolPermissions from './EntityRolPermissions';

interface UserEntityPermissions {
  userId: string;
  isAdmin: boolean;
  EntityRolPermissions: Array<EntityRolPermissions>;
}

export default UserEntityPermissions;
