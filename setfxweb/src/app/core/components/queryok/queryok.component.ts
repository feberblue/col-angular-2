import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { QuerySetFxService } from '../../services/query-set-fx.service';
import { SetFxModel } from '../../models/setfx.model';
import { RootSetFxModel } from '../../models/rootsetfx.model';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { DetailSetFxComponent } from '../detailsetfx/detailsetfx.component';
import { MessageAlertComponent } from '../message/message.component';
import { AlertModel } from '../../models/alert.model';
import { AlertType } from '../../enums/alert.emun';
import { interval, Subject } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { ConfigappService } from '../../services/configapp.service';
import * as $ from 'jquery';

////// components Extras
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


export class HabilitaBotones {
  SetFxObject: string;
  habilita: boolean;
  timefin: number;

  constructor(SetFxId: string, enable: boolean) {
    this.SetFxObject = SetFxId;
    this.habilita = enable;
    this.timefin = (new Date().getTime() / 1000) + 10;
  }
}

@Component({
  selector: 'app-queryok',
  templateUrl: './queryok.component.html',
  styleUrls: ['./queryok.component.css']
})
export class QueryokComponent implements AfterViewInit, OnDestroy, OnInit {

  //@ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  arrayRootSetFx: RootSetFxModel;
  alertConfig: AlertModel;
  arrayQuery: SetFxModel[] = [];
  filterData: string = "Done";
  arrayHabilita: HabilitaBotones[] = [];
  selectSetfx: SetFxModel;
  interaccion;

  objArray: string[] = ["Done", "Pending", "Error"];

  dtTrigger: Subject<any> = new Subject();

  dataSource: MatTableDataSource<SetFxModel>;
  displayedColumns: string[] = ['Consecutive', 'DealId', 'SetFxId', 'Status', 'Action', 'PrincipalAmount', 'UserFx', 'ErrorMessage', 'Operations'];

  /**
   * Method OnInit the component
   */
  ngOnInit() {
    this.arrayQuery = [];
    this.renderMaterialDataTable();
    if (this._config.configuracion !== undefined) {
      this.interaccion = interval(parseInt(this._config.configuracion.time_config) * 1000).subscribe(s => {
        console.log(new Date().getHours() + " " + new Date().getMinutes() + " " + new Date().getSeconds());
        this.getAllData();
      });
    } else {
      this._config.getEspera().subscribe(res => {
        this._config.configuracion = res;
        this.interaccion = interval(parseInt(this._config.configuracion.time_config) * 1000).subscribe(s => {
          console.log(new Date().getHours() + " " + new Date().getMinutes() + " " + new Date().getSeconds());
          this.getAllData();
        });
      });
    }

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Method Implement OnAfter View Init the Component
   */
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  /**
   * Do not forget to unsubscribe the event 
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.interaccion.unsubscribe();
  }


  /**
   * 
   * @param _query : Service QuerySetFxService
   * @param router : Router Module
   * @param dialog : Class Dialog of Angular Material
   */
  constructor(private _query: QuerySetFxService,
    private router: Router,
    private sessionLocal: StorageService,
    public _config: ConfigappService,
    public dialog: MatDialog) {

    this._config.getEspera().subscribe(res => {
      this._config.configuracion = res;
      this.interaccion = interval(parseInt(this._config.configuracion.time_config) * 1000).subscribe(s => {
        console.log(new Date().getHours() + " " + new Date().getMinutes() + " " + new Date().getSeconds());
        this.getAllData();
      });
    });
  }
  /**
   * Return filterData Selection for Select Control Filter
   */
  get selectFilterData() {
    return this.filterData;
  }

  /**
   * Set filterData Selection for Select Control Filter
   */
  set selectFilterData(value) {
    this.filterData = value;
  }

  /**
   * 
   * @param item: Object SetFxModel take for disabled botton after click
   */
  public sendQuery(item: SetFxModel): void {
    this._query.processError(this._config.configuracion.url_proccess_swap_test, item, this.sessionLocal.getCurrentToken()).subscribe(res => {
      item.Habilitado = false;
      this.getAllDataFilter(item);
      this.openAlert("A re-processing of the request has been sent: " + item.SetFx_Id, AlertType.SUCCESS.toString());
    }, error => {
      this.openAlert(error.error, AlertType.ERROR.toString());
    });
  }

  /**
   * Confirm execute reprocess of an Item SetFx
   * @param item 
   */
  public executeError(item: SetFxModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reprocess it!'
    }).then((result) => {
      if (result.value) {
        this.sendQuery(item);
      }
    });
  }

  /**
   * Get all Information of service blotter depending of state selection
   */
  public getAllData() {
    this.arrayQuery = [];
    this.deleteItemHabilita();
    let url: string;

    url = this._config.configuracion.url_query_swap;

    this._query.getAllData(url, this.filterData, this.sessionLocal.getTokenActive()).subscribe(res => {

      this.arrayRootSetFx = res as RootSetFxModel;
      
      if (this.arrayRootSetFx.root !== undefined) {
        this.arrayQuery = this.arrayRootSetFx.root;
        if (this.arrayQuery !== null && this.arrayQuery.length > 0) {
          this.arrayQuery.forEach(item => {
            item.Habilitado = true;
            item.MessageFormat = JSON.parse(item.Message);
            if (this.arrayHabilita !== null && this.arrayHabilita.length > 0) {
              this.arrayHabilita.forEach(obj => {
                if (obj.SetFxObject === item.SetFx_Id) {
                  item.Habilitado = obj.habilita;
                }
              });
            }
          });
        } else {
          this.arrayQuery = [];
        }
      }else{
        this.arrayQuery = [];
      }
      this.renderMaterialDataTable();
    }, error => {
      this.autoCloseAppError401(error);
    });
  }

  /**
   * Delete item in array Habilita for disable/enable button
   * in Table when past time 10 Seg
   */
  deleteItemHabilita() {
    var tempFinal = new Date().getTime() / 1000;
    if (this.arrayHabilita.length > 0) {
      for (var i = 0; i <= this.arrayHabilita.length - 1; i++) {
        if (tempFinal >= this.arrayHabilita[i].timefin) {
          this.arrayHabilita.splice(i, 1);
        }
      }
    }
  }

  /**
   * Render Table Material Angular
   */
  renderMaterialDataTable() {
    this.dataSource = new MatTableDataSource<SetFxModel>();
    this.dataSource.data = this.arrayQuery;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Get all information depending of method getAllData add with parameter
   * Object SetFxModel for button disabled/enabled, after the method instance
   * in DataTable 
   * @param objetoSetFx : Object SetFxModel
   */
  public getAllDataFilter(objetoSetFx: SetFxModel) {
    this.arrayQuery = [];

    this._query.getAllData(this._config.configuracion.url_query_swap, this.filterData, this.sessionLocal.getCurrentToken()).subscribe(res => {
      this.arrayRootSetFx = res as RootSetFxModel;
      this.arrayQuery = this.arrayRootSetFx.root;
      if (this.arrayQuery !== null && this.arrayQuery.length > 0) {
        this.arrayQuery.forEach(item => {
          item.MessageFormat = JSON.parse(item.Message);
          if (item.SetFx_Id === objetoSetFx.SetFx_Id) {
            item.Habilitado = objetoSetFx.Habilitado;
            let habilitado = new HabilitaBotones(item.SetFx_Id, objetoSetFx.Habilitado);
            this.arrayHabilita.push(habilitado);
          }
        });
      } else {
        this.arrayQuery = [];
      }
      this.renderMaterialDataTable();
    }, error => {
      this.autoCloseAppError401(error);
    });
  }

  /**
   * Method used for call getAllData for filter ComboBox
   * @param data 
   */
  public changeData(data) {
    this.getAllData();
  }

  /**
   * Implement call for Show Dialog. This Containe the Detail SetFx
   * @param itemSetfx : Item Select in Buttom on DataTable Angular Material
   */
  public viewDetail(itemSetfx: any) {
    this.selectSetfx = <SetFxModel>itemSetfx;
    this.openDialog();
  }

  /**
   * Open Detail SetFx for SetFx_Id
   */
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.selectSetfx;
    dialogConfig.width = "90%";
    const dialogRef = this.dialog.open(DetailSetFxComponent, dialogConfig);
  }

  /**
   * Open Message to User
   * @param textMessage Text Message to show a user
   * @param typeMessage Type Message (Error, Success, Warning)
   */
  openAlert(textMessage: string, typeMessage: string): void {
    this.alertConfig = new AlertModel();
    this.alertConfig.messageText = textMessage;
    this.alertConfig.messageType = typeMessage;
    const alertDialog = new MatDialogConfig();
    alertDialog.data = this.alertConfig;
    const dialogAlertRef = this.dialog.open(MessageAlertComponent, alertDialog);
  }

  /**
   * Call function to Show Message Error Generic
   * @param errorString : Error to show a user
   */
  showError(errorString: string) {
    this.openAlert(errorString, AlertType.ERROR.toString());
  }


  /**
   * Implement flitered to Angular Material DataTable
   * @param filterValue 
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Please Implement Method for Read forlder contains Files TXT
   */
  readFiletxt() {
    this._query.readtxt("app/txt/archivo.txt").subscribe(res => {

    });
  }

  /**
   * Auto Close App when Services response Http 401
   * for invalid token
   * @param error HttpErrorResponse
   */
  autoCloseAppError401(error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        let timerInterval;
        Swal.fire({
          title: 'Auto close alert!',
          type: 'error',
          text: 'User Unauthorized',
          footer: 'I will close application in <strong></strong> seconds.',
          timer: 5000,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = String(Swal.getTimerLeft())
            }, 1000);
          },
          onClose: () => {
            clearInterval(timerInterval);
            this.sessionLocal.logout();
            this.router.navigate(['/login']);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
            this.sessionLocal.logout();
            this.router.navigate(['/login']);
          }
        });
      }
    }
  }

}
