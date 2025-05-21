import { SessionInfoInterface } from './sessionInfo.interface';
import { UserInfoInterface } from './userInfo.interface';

export type RequestInterface = Request & {
  sessionInfo: SessionInfoInterface;
  userPermissions?: string[];
  userInfo: UserInfoInterface;
};
