import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigSetting } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigappService {

  public configuracion: ConfigSetting;

  constructor(private httpClient: HttpClient) {

  }

  /**
   * return object JSON of File configuration
   */
  getEspera(): any {
    return this.httpClient.get("/assets/config.properties.json");
  }


}
