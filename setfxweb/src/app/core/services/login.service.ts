import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Session } from '../models/session.model';
import { LoginObject } from '../models/login-object.model';
import { StorageService } from './storage.service';
import { Respuesta } from '../models/respuesta';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  wsSubscription: Subscription;
  baseUrl: string ;
  status: any;
  messageForServe: string = "";
  visibilidadMsg: boolean = false;
  msgGeneral: Respuesta;
  session: Session;


  constructor(    
    private _http: HttpClient, 
    private storage: StorageService) {
  }


  /**
   * if a user is Logged
   */
  isLogged() {
    return this.storage.isAuthenticated();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  /**
   * Send User an Password 
   * @param loginObj 
   */
  login(loginObj: LoginObject): Observable<any> {
    return this._http.post(this.baseUrl, loginObj);
  }

  /**
   * Create a bad Session
   */
  badSession(): Session {
    let badSessionItem = new Session();
    badSessionItem.token = "";
    badSessionItem.user = { id: -1, name: '', surname: '', email: '', username: '' };
    return badSessionItem;
  }

  /**
   * Create Goog Session login
   * @param sesionpost 
   */
  goodSession(sesionpost: Session): Session {
    let sessionItem = new Session();
    sessionItem.token = sesionpost.token;
    sessionItem.user = {
      id: sesionpost.user.id,
      name: sesionpost.user.name,
      surname: sesionpost.user.surname,
      email: sesionpost.user.email,
      username: sesionpost.user.username
    };
    return sessionItem;
  }


}
