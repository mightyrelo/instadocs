import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { QuotationDataService } from '../quotation-data.service';
import { Quote } from '../customer';

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
  @Input() otherProducts = [];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  constructor(
    private quoteDataService : QuotationDataService
  ) { }

  public allProducts = [];
  public acProducts = [];
  public wirProducts = [];
  public batProducts = [];
  public otProducts = [];
  public customer : Customer;

  public pvQuoteDone : boolean = false;
  public pvwQuoteDone : boolean = false;
  public acQuoteDone : boolean = false;
  public battQuoteDone : boolean = false;
  public otherQuoteDone : boolean = false;

  public mainQuote : Quote = new Quote();
  

  public onPVFormClosedEvent(eventData : boolean) {
    //this.formClosedEvent.emit(false);
    this.pvQuoteDone = true;
  }

  public onPVWFormClosedEvent(eventData : boolean) {
    this.pvwQuoteDone = true;
     // this.formClosedEvent.emit(false);
  }

  public onACFormClosedEvent(eventData : boolean) {
    this.acQuoteDone = true;
    //this.formClosedEvent.emit(false);
  }

  public onBattFormClosedEvent(eventData : boolean) {
    this.battQuoteDone = true;
    //this.formClosedEvent.emit(false);
  }

  public onOtherFormClosedEvent(eventData : boolean) {
    this.otherQuoteDone = true;
    this.formClosedEvent.emit(false);
  }

  public onACQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
       
  }
  
  public onPVQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
       
  }
  
  public onPVWQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
       
  }
  
  public onBattQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
       
  }
  
  public onOtherQuoteGenerated(evntData : Quote) {
    //console.log('how?');
    this.addItemsToQuote(evntData);
    this.doCreateQuote();
       
  }

  private addItemsToQuote(evntData : Quote) {
    console.log('in sp', evntData);
    for(let i = 0; i < evntData.quoteItems.length; i++){
      this.mainQuote.quoteItems.push(evntData.quoteItems[i]);
    }
  }
  
  private doCreateQuote() : void {
    console.log('why not create?');
    this.quoteDataService.addQuote(this.dbCustomer._id, this.mainQuote)
      .then((quotation: Quote) => {
        console.log('quotation saved', quotation);
        let quotes = this.dbCustomer.quotations.slice(0);
        quotes.unshift(quotation);
        this.dbCustomer.quotations = quotes;
      });
  }

  ngOnInit() {
    this.allProducts = this.dbProducts;
    this.acProducts = this.aacProducts;
    this.wirProducts = this.wireProducts;
    this.batProducts = this.battProducts;
    this.otProducts = this.otherProducts;
    this.customer = this.dbCustomer;
    this.mainQuote.quoteItems = [];
  }

}
