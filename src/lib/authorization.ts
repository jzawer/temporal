import { defineAbility, type AnyMongoAbility } from '@casl/ability';
import type Permission from '@/entities/Permission';

function generateAbilities(
  permissions: Array<Permission> = []
): AnyMongoAbility {
  return defineAbility((can) => {
    permissions.forEach((permission) => {
      const permissionValues = permission.name.split('_');
      can(permissionValues[0], permissionValues[1]);
    });
  });
}

export default generateAbilities;
