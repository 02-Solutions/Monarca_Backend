import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: number[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
