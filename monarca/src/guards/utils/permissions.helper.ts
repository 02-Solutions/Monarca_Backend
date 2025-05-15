/**
 * ===========================================
 * Funciones auxiliares para gestión de permisos
 * ===========================================
 *
 * Este archivo centraliza la lógica para verificar
 * si un usuario tiene permisos específicos.
 *
 * Esto ayuda a mantener el código limpio, reutilizable
 * y escalable conforme crece el número de rutas y permisos.
 */

/**
 * Verifica si el usuario tiene un permiso específico.
 */
export function hasPermission(req: any, permissionName: string): boolean {
  return req.userPermissions?.includes(permissionName) || false;
}

/**
 * Verifica si el usuario tiene al menos uno de los permisos proporcionados.
 */
export function hasAnyPermission(req: any, permissionNames: string[]): boolean {
  if (!req.userPermissions) return false;
  return permissionNames.some((perm) => req.userPermissions.includes(perm));
}

/**
 * Verifica si el usuario tiene todos los permisos proporcionados.
 */
export function hasAllPermissions(
  req: any,
  permissionNames: string[],
): boolean {
  if (!req.userPermissions) return false;
  return permissionNames.every((perm) => req.userPermissions.includes(perm));
}

/**
 * Verifica si el usuario no tiene un permiso específico.
 */
export function lacksPermission(req: any, permissionName: string): boolean {
  return !hasPermission(req, permissionName);
}
