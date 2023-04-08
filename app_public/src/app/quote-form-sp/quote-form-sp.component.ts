import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer';

@Component({
  selector: 'app-quote-form-sp',
  templateUrl: './quote-form-sp.component.html',
  styleUrls: ['./quote-form-sp.component.css']
})
export class QuoteFormSpComponent implements OnInit {

  @Input() dbCustomer : any;
  @Input() displayForm : boolean;
  @Input() dbProducts = [];
  @Input() aacProducts = [];
  @Input() wireProducts = [];
  @Input() battProducts = [];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  constructor() { }

  public allProducts = [];
  public acProducts = [];
  public wirProducts = [];
  public batProducts = [];
  public customer : Customer;

  public pvQuoteDone : boolean = false;
  public pvwQuoteDone : boolean = false;
  public acQuoteDone : boolean = false;

  public onPVFormClosedEvent(eventData : boolean) {
    //this.formClosedEvent.emit(false);
    this.pvQuoteDone = true;
  }

  public onPVWFormClosedEvent(eventData : boolean) {
    this.pvwQuoteDone = true;
     // this.formClosedEvent.emit(false);
  }

  public onACFormClosedEvent(eventData : boolean) {
    console.log('here');
    this.acQuoteDone = true;
    //this.formClosedEvent.emit(false);
  }

  public onBattFormClosedEvent(eventData : boolean) {
    //this.acQuoteDone = true;
    //this.formClosedEvent.emit(false);
  }



  ngOnInit() {
    this.allProducts = this.dbProducts;
    this.acProducts = this.aacProducts;
    this.wirProducts = this.wireProducts;
    this.batProducts = this.battProducts;
    this.customer = this.dbCustomer;
  }

}
