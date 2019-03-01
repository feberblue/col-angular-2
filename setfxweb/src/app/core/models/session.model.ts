import { User } from './user.model';

export interface ISession {
  token: string;
  user: User;
}

export class Session {
  public token: string;
  public user: User;  
  
}