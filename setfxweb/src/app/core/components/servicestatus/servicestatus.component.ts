import { Component, OnInit } from '@angular/core';
import { QuerySetFxService } from '../../services/query-set-fx.service';

@Component({
  selector: 'app-servicestatus',
  templateUrl: './servicestatus.component.html',
  styleUrls: ['./servicestatus.component.css']
})
export class ServiceStatusComponent implements OnInit {

  public arrayServices : ServiceStatusOnLine[];
  constructor(private _query: QuerySetFxService) { }

  ngOnInit() {
  }

}

interface ServiceStatusOnLine{
  online: string;
  nameService: string;
  recomender: string;
}
