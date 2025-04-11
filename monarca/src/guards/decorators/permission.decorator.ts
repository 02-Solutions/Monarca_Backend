import { SetMetadata } from '@nestjs/common';

export const Permission = (...permissions: string[]) => {
  return SetMetadata('roles', permissions);
};
