import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote-form-sp',
  templateUrl: './quote-form-sp.component.html',
  styleUrls: ['./quote-form-sp.component.css']
})
export class QuoteFormSpComponent implements OnInit {

  @Input() dbCustomer : any;
  @Input() displayForm : boolean;
  @Input() dbProducts = [];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  constructor() { }

  public allProducts = [];

  public onFormClosedEvent(eventData : boolean) {
    this.formClosedEvent.emit(false);
  }

  ngOnInit() {
    this.allProducts = this.dbProducts;
  }

}
