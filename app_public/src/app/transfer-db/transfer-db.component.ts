import { Component, OnInit } from '@angular/core';

import { DbTransferService } from '../db-transfer.service';

@Component({
  selector: 'app-transfer-db',
  templateUrl: './transfer-db.component.html',
  styleUrls: ['./transfer-db.component.css']
})
export class TransferDbComponent implements OnInit {

  public formError = '';
  public formUser = {
    name: '',
    pricelist: ''
  }
  public dataTransferred : boolean = false;


  constructor(
    private dbTransferService: DbTransferService
  ) { }

  public onUserNameSubmit() : void {
    this.dbTransferService.transferDB(this.formUser)
      .then(rsp => {console.log('transferred'); this.dataTransferred = true;});

  }

  ngOnInit() : void{
    this.dataTransferred = false;
  }

}
