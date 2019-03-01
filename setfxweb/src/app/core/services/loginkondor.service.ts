import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginkondorService {

  public ws: WebSocket;
  socketIsOpen = 1;
  public respuesta: string;
  public _logger: string = "";


  constructor() { }

  /**
   * 
   * @param url 
   */
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);


    return new Observable(
      observer => {
        this.ws.onmessage = (event) => {
          observer.next(event.data);
          this._logger = "{" + event.data.split('{')[1];
        }
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        return () => this.ws.close(1000, 'the user disconnet');
      }
    );
  }

  /**
   * 
   * @param login user login
   * @param password password user
   */
  sendMessage(login: string, password: string): string {
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(`{"MessageType": "Auth",  "UserName": "${login.toUpperCase()}", "Password": "${password}" }`);
      return "Send";
    } else {
      return "No Send";
    }
  }

  /**
   * Validate Token with Login Service
   * @param token 
   */
  sendToken(url: string, token: any) {
    console.log("Ejecutando validar Token : " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
    if (this.ws === undefined) {
      this.createObservableSocket(url);
    }
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(`{"MessageType": "Validation", "Token": "${token}" }`);
      return "Send";
    } else {
      return "No Send";
    }

  }

  closeWsAuthenticate() {
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.close();
    }
  }

}
