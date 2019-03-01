import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { StorageService } from '../core/services/storage.service';
import { Session } from '../core/models/session.model';
import { LoginkondorService } from '../core/services/loginkondor.service';
import { Respuesta } from '../core/models/respuesta';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ConfigappService } from '../core/services/configapp.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: { code: number, message: string } = null;
  private msgErrorLoginService : string = 'Login Service unavailable';
  public status;
  msgGeneral: Respuesta;
  messageForServe: string;
  visibilidadMsg: boolean = false;
  wsSubscription: Subscription;
  geolocationPosition:any;
  //URL_T_KEY: string = "_GHupoIGKJGFUgYgNtqK9nSZQdWtTb5ver9m8w4Nw_";

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private loginKondor: LoginkondorService,
    private router: Router,
    public _config : ConfigappService) {
    
    this._config.getEspera().subscribe(conf=>{
      this._config.configuracion = conf;
      this.wsSubscription = this.loginKondor.createObservableSocket(this._config.configuracion.url_login)
      .subscribe(
        data => {
          this.messageForServe = data;          
        },
        err => {
          //console.log(err);
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: this.msgErrorLoginService
          });
        },
        () => console.log('The Observable stream is complete')
      );
    });

    
  }

  ngOnInit() {
    this.storageService.removeCurrentSession();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  /**
   * Method executed when close page 
   */
  ngOnDestroy(): void {
    this.closetSocket();
  }

/**
 * Submit data for login user
 */
  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.valid) {      
      var loginObj = this.loginForm.value;
      //console.log(this.loginKondor.ws);
     
      this.status = this.loginKondor.sendMessage(loginObj.username, loginObj.password);      

      setTimeout(() => {
        if (this.status === "Send") {
        
          this.messageForServe = this.loginKondor._logger; 

          if (this.messageForServe === "" || this.messageForServe === undefined) {
            this.visibilidadMsg = false;
          } else {
            this.msgGeneral = JSON.parse(this.messageForServe);
       
            this.visibilidadMsg = true;

            switch (this.msgGeneral.ErrorCode) {
              case 0:
                if (this.msgGeneral.HasPermission == 'T') {                                 
                  var session: Session = new Session();
                  this.storageService.setCurrentToken(this.msgGeneral.Token);
                  session.token = this.storageService.getCurrentToken();
                  session.user = { id: Math.random(), name: loginObj.username, surname: loginObj.username, email: '', username: loginObj.username };
                  this.correctLogin(session);
                } else {
                  Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: this.msgGeneral.ErrorMsg
                  });
                }

                break;
              default:                
                Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: this.msgGeneral.ErrorMsg
                });
                break;
            }
          }
        } else {
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: this.msgErrorLoginService
          });
        }
      }, 2000);
    }
  }

  /**
   * if login accept Session, redirect app to /swap page
   * @param data 
   */
  private correctLogin(data: Session) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/swap']);
  }

  /**
   * 
   */
  public sessionActivate(): boolean {
    return this.storageService.isAuthenticated();
  }

  /**
   * Close Socket Login
   */
  closetSocket() {
    this.wsSubscription.unsubscribe();
    this.status = "";
  }

}
