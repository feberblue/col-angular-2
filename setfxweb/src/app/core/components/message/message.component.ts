import { Component, OnInit, Inject } from '@angular/core';
import { AlertModel } from '../../models/alert.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageAlertComponent implements OnInit {

  messageType: string;
  messageText: string;

  constructor(public dialogRef: MatDialogRef<MessageAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAlert: AlertModel) { }

  ngOnInit() {
    this.messageText = this.dataAlert.messageText;
    this.messageType = this.dataAlert.messageType;
  }

}
