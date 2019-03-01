import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[StorageService, LoginService]
})
export class NavbarComponent implements OnInit {

  constructor(private _storage : StorageService) { }

  ngOnInit() {
  }

  public logout(){
    this._storage.logout();
  }

}
