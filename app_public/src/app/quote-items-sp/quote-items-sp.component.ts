import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../customer';

@Component({
  selector: 'app-quote-items-sp',
  templateUrl: './quote-items-sp.component.html',
  styleUrls: ['./quote-items-sp.component.css']
})
export class QuoteItemsSpComponent implements OnInit {

  @Input() quote : Quote;

  public pvQuote : Quote = new Quote();
  public pvwQuote : Quote = new Quote();
  public acQuote : Quote = new Quote();
  public battQuote : Quote = new Quote();
  public otQuote : Quote = new Quote();
  public protQuote : Quote = new Quote();
  public cabQuote : Quote = new Quote();

  public revealPV : boolean = false;
  public revealPVW : boolean = false;
  public revealAC : boolean = false;
  public revealBATT : boolean = false;
  public revealOT : boolean = false;
  public revealProt : boolean = false;
  public revealCab : boolean = false;

  constructor() { }

  private splitMainIntoSubQuotes() : void {
    for(let i = 0; i < this.quote.quoteItems.length; i++){

      if(this.quote.quoteItems[i].category == 'pv')
      {
          this.pvQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.pvQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          this.pvQuote.expense += this.quote.quoteItems[i].productExpense*this.quote.quoteItems[i].quantity;
          this.pvQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense)*this.quote.quoteItems[i].quantity;
      }
      else if(this.quote.quoteItems[i].category == 'ac')
      {
          this.acQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.acQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          this.acQuote.expense += (this.quote.quoteItems[i].productExpense)*this.quote.quoteItems[i].quantity;
          this.acQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense)**this.quote.quoteItems[i].quantity;
      }
      else if(this.quote.quoteItems[i].category == 'pvw')
      {

          this.pvwQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.pvwQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          this.pvwQuote.expense += this.quote.quoteItems[i].productExpense*this.quote.quoteItems[i].quantity;
          this.pvwQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense)**this.quote.quoteItems[i].quantity;
      }
      if(this.quote.quoteItems[i].category == 'batt')
      {
          this.battQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.battQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          this.battQuote.expense += this.quote.quoteItems[i].productExpense*this.quote.quoteItems[i].quantity;
          this.battQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense);
      }
      if(this.quote.quoteItems[i].category == 'ot')
      {
          this.otQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.otQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          
          this.otQuote.expense += this.quote.quoteItems[i].productExpense*this.quote.quoteItems[i].quantity;
          this.otQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense)*this.quote.quoteItems[i].quantity;
      }
      if(this.quote.quoteItems[i].category == 'prot')
      {
          this.protQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.protQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          
          this.protQuote.expense += this.quote.quoteItems[i].productExpense*this.quote.quoteItems[i].quantity;
          this.protQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense)*this.quote.quoteItems[i].quantity;
      }
      if(this.quote.quoteItems[i].category == 'cab')
      {
          this.cabQuote.quoteItems.push(this.quote.quoteItems[i]);
          this.cabQuote.amount += this.quote.quoteItems[i].productAmount*this.quote.quoteItems[i].quantity;
          
          this.cabQuote.expense += this.quote.quoteItems[i].productExpense*this.quote.quoteItems[i].quantity;
          this.cabQuote.profit += (this.quote.quoteItems[i].productAmount - this.quote.quoteItems[i].productExpense)*this.quote.quoteItems[i].quantity;
      }
    }
    this.pvQuote.summary = 'PV SETUP';
    this.acQuote.summary = 'AC';
    this.pvwQuote.summary = 'PV CABLING';
    this.battQuote.summary = 'BATTERY';
    this.otQuote.summary = 'ADDITIONAL';
    this.protQuote.summary = 'PV SAFE';
    this.cabQuote.summary = 'CABLEWAY';
  }

  ngOnInit() : void{
    this.pvQuote.quoteItems = [];
    this.pvwQuote.quoteItems = [];
    this.acQuote.quoteItems = [];
    this.battQuote.quoteItems = [];
    this.otQuote.quoteItems = [];
    this.protQuote.quoteItems = [];
    this.cabQuote.quoteItems = [];
    this.pvQuote.amount = 0;
    this.acQuote.amount = 0;
    this.pvwQuote.amount = 0;
    this.battQuote.amount = 0;
    this.otQuote.amount = 0;
    this.protQuote.amount = 0;
    this.cabQuote.amount = 0;
    this.splitMainIntoSubQuotes();
  }

}
