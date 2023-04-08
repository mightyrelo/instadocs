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
  @Output() formClosedEvent = new EventEmitter<boolean>();
  constructor() { }

  public allProducts = [];
  public acProducts = [];
  public wirProducts = [];
  public customer : Customer;

  public pvQuoteDone : boolean = false;
  public pvwQuoteDone : boolean = false;

  public onPVFormClosedEvent(eventData : boolean) {
    //this.formClosedEvent.emit(false);
    this.pvQuoteDone = true;
  }

  public onPVWFormClosedEvent(eventData : boolean) {
    console.log('here');
    this.pvwQuoteDone = true;
     // this.formClosedEvent.emit(false);
  }

  public onACFormClosedEvent(eventData : boolean) {
    //this.formClosedEvent.emit(false);
  }



  ngOnInit() {
    this.allProducts = this.dbProducts;
    this.acProducts = this.aacProducts;
    this.wirProducts = this.wireProducts;
    this.customer = this.dbCustomer;
  }

}
