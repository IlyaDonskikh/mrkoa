import { DefaultContext } from 'koa';
import { User } from '../models/user.model';
import { UserSession } from '../models/user/session.model';

declare module 'koa' {
  interface DefaultContext {
    currentUser?: User | null;
    currentSession?: UserSession | null;
  }
}

export interface AuthenticatedContext extends DefaultContext {
  currentUser: User;
  currentSession: UserSession;
}
