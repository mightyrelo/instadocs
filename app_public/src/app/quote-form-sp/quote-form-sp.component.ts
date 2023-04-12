import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { QuotationDataService } from '../quotation-data.service';
import { Quote } from '../customer';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

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
    private quoteDataService : QuotationDataService,
    private userDataService : UserDataService,
    private authService: AuthenticationService
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

  public pvSummary : string;
  public pvQuote : boolean = false;
  public pvTotal : number;

  public pvcSummary : string;
  public pvcQuote : boolean = false;
  public pvcTotal : number;

  public acSummary : string;
  public acQuote : boolean = false;
  public acTotal : number;

  public battSummary : string;
  public battQuote : boolean = false;
  public battTotal : number;

  public otherSummary : string;
  public otherQuote : boolean = false;
  public otherTotal : number;

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
  }

  public submitQuote() : void {
      this.formClosedEvent.emit(false);
      this.doCreateQuote();
  }

  public onACQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
    this.acSummary = evntData.summary;
    this.acQuote = true;
    this.acTotal = evntData.amount;

       
  }
  
  public onPVQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
    this.pvSummary = evntData.summary;
    this.pvQuote = true;
    this.pvTotal = evntData.amount;
  }
  
  public onPVWQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
    this.pvcSummary = evntData.summary;
    this.pvcQuote = true;
    this.pvcTotal = evntData.amount;

    //this.pvSummary = evntData.summary;
   // this.pvQuote = evntData.summary;
       
  }
  
  public onBattQuoteGenerated(evntData : Quote) {
    this.addItemsToQuote(evntData);
    this.battSummary = evntData.summary;
    this.battQuote = true;
    this.battTotal = evntData.amount;

       
  }
  
  public onOtherQuoteGenerated(evntData : Quote) {
    //console.log('how?');
    this.addItemsToQuote(evntData);
    this.otherSummary = evntData.summary;
    this.otherQuote = true;
    this.otherTotal = evntData.amount;
    //time delay
       
  }

  private addItemsToQuote(evntData : Quote) {
    for(let i = 0; i < evntData.quoteItems.length; i++){
      this.mainQuote.quoteItems.push(evntData.quoteItems[i]);
    }
    console.log('adding to main', evntData.amount);
    this.mainQuote.amount += evntData.amount;
    this.mainQuote.profit += evntData.profit;
    this.mainQuote.expense += evntData.expense;
    this.mainQuote.summary += evntData.summary;
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
     return name ? name : 'Guest'
    }
    return 'Guest';
    
  }


  
  private doCreateQuote() : void {
    this.quoteDataService.addQuote(this.dbCustomer._id, this.mainQuote)
      .then((quotation: Quote) => {
        console.log('deep', this.mainQuote.amount)
          console.log('quotation saved', quotation);
          let quotes = this.dbCustomer.quotations.slice(0);
          quotes.unshift(quotation);
          this.dbCustomer.quotations = quotes;
          this.userDataService.getUserByName(this.getUserName())
            .then(response => {
            response.completedQuotes = response.completedQuotes + 1;
            this.userDataService.updateQuotes(response)
                .then(usr => {
                    console.log('completed quotes', usr.completedQuotes);
                });
            
            });

    });
    
    
  }

  public resetAndHideQuoteForm() : void {
    this.formClosedEvent.emit(false);
  }

  ngOnInit() {
    this.allProducts = this.dbProducts;
    this.acProducts = this.aacProducts;
    this.wirProducts = this.wireProducts;
    this.batProducts = this.battProducts;
    this.otProducts = this.otherProducts;
    this.customer = this.dbCustomer;
    this.mainQuote.quoteItems = [];
    this.mainQuote.amount = 0;
    this.mainQuote.profit = 0;
    this.mainQuote.expense = 0;
  }

}
