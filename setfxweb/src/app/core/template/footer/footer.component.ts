import { Component, OnInit, Input } from '@angular/core';
import { QuerySetFxService } from '../../services/query-set-fx.service';
import { ServiceOnLine } from '../../models/serviceonline.model';
import { StorageService } from '../../services/storage.service';
import { ConfigappService } from '../../services/configapp.service';
import { ConfigSetting } from '../../models/config.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public annioActual: number;
  public _serSwap: ServiceOnLine;
  public _serForward: ServiceOnLine;
  public _serExample: ServiceOnLine;

  @Input() config: string;


  /**
   * Add the All Services for test connection
   * @param _sSwap service get/set values Swap
   * @param tokenService Service get/set values of token and session
   * @param _config Service get parameters of system app
   */
  constructor(private _sSwap: QuerySetFxService,
    private tokenService: StorageService,
    public _config: ConfigappService) {
    this._serSwap = new ServiceOnLine();
    this._config.getEspera().subscribe(data => {
      this._config.configuracion = data;
      this._serSwap = this.getServiceSwap();
    });
  }

  /**
   * Add implementation for call method read serveces
   */
  ngOnInit() {
    if (this._config.configuracion === undefined || this._config.configuracion === null) {
      this._config.getEspera().subscribe(data => {
        this._config.configuracion = data;
        this._serSwap = this.getServiceSwap();
      });
    } else {
      this._serSwap = this.getServiceSwap();
    }

  }

  /**
   * Comprueba la disponibilidad del Servicio Swap Blotter
   */
  getServiceSwap(): ServiceOnLine {
    let servicio1 = new ServiceOnLine();
    servicio1.service = "SWAP";
    servicio1.onLineColor = "red";
    console.log(this._config.configuracion.url_query_swap);
    try {
     /* this._sSwap.getAllData(this._config.configuracion.url_query_swap, "Done", this.tokenService.getCurrentToken()).subscribe(res => {
        if (res === null) {
          servicio1.onLineColor = "red";
        } else {
          servicio1.onLineColor = "green";
        }
      }, error => {
        servicio1.onLineColor = "red";
      });*/
    } catch (error) {
      servicio1.onLineColor = "red";
    }

    return servicio1;
  }
}


