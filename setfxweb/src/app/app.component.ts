import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { LoginkondorService } from './core/services/loginkondor.service';
import { Respuesta } from './core/models/respuesta';
import { StorageService } from './core/services/storage.service';
import { ConfigappService } from './core/services/configapp.service';

@Component({
  selector: 'app-setfx',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfigappService]
})
export class AppComponent implements OnDestroy, OnInit {


  title = 'setfxweb';

  public error: { code: number, message: string } = null;  
  public status;
  msgGeneral: Respuesta;
  intervalo: Subscription;
  messageForServe: string;
  visibilidadMsg: boolean = false;
  wsSubscription: Subscription;

/**
 * Destroid component, when closed navigate
 */
  ngOnDestroy(): void {
    this.destroidSession();
    this.intervalo.unsubscribe();
  }

  /**
   * on Init Application setfxweb
   */
  ngOnInit(): void {
    this.configapp.getEspera().subscribe(data => {
      this.configapp.configuracion = data;
      this.initApp();
    });
  }

  /**
   * Destroid All items of LocalStorage
   * and Delete var Intervalo
   */
  destroidSession() {
    this.storageService.logout()       
  }

  /**
   * Constructor Method of App Component
   * @param configapp 
   * @param loginKondor 
   * @param storageService 
   */
  constructor(public configapp: ConfigappService,
    private loginKondor: LoginkondorService,
    private storageService: StorageService
  ) {

  }

  /**
   * Method init the all Instances of Application
   */
  initApp() {
    //console.log("Iniciando app Angular");
    //console.log(this.configapp.configuracion);
    this.intervalo = interval(parseInt(this.configapp.configuracion.time_config_token) * 1000).subscribe(response => {

      if (this.loginKondor.ws === undefined) {
        this.wsSubscription = this.loginKondor.createObservableSocket(this.configapp.configuracion.url_login)
          .subscribe(
            data => {
              this.messageForServe = data;
              //console.log(this.messageForServe)
            },
            err => {
            console.log(err);
            },
            () => console.log('The Observable stream is complete')
          );
      }
      if (this.storageService.getTokenActive() !== null &&
        this.storageService.getTokenActive() !== "" &&
        this.storageService.getTokenActive() !== undefined &&
        this.storageService.getTokenActive() !== "undefined"
      ) {
        //console.log("intentando comprobar Token valido");
        //console.log(this.storageService.getTokenActive());

        this.status = this.loginKondor.sendToken(this.configapp.configuracion.url_login, this.storageService.getTokenActive());
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
                  if (this.msgGeneral.HasPermission === 'F') {
                    this.destroidSession();
                  }
                  break;
                default:
                  this.destroidSession();
                  break;
              }
            }
            this.loginKondor.closeWsAuthenticate();
          } else {
            this.wsSubscription = this.loginKondor.createObservableSocket(this.configapp.configuracion.url_login)
              .subscribe(
                data => {
                  this.messageForServe = data;
                  //console.log(this.messageForServe)
                },
                err => {
                  console.log(err);
                },
                () => console.log('The Observable stream is complete')
              );
          }
        }, 2000);
      } else {
        this.destroidSession();                
      }
    });
  }

}
