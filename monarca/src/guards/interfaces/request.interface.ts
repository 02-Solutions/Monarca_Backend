import { SessionInfoInterface } from "./sessionInfo.interface";

export type RequestInterface =
    Request & {
    sessionInfo: SessionInfoInterface;
        userPermissions?: string[];
      }
