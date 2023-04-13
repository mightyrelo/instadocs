import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { AuthenticationService } from '../authentication.service';
import { QuoteItem8 } from '../customer';
import { Quote } from '../customer';

@Component({
  selector: 'app-quote-cab',
  templateUrl: './quote-cab.component.html',
  styleUrls: ['./quote-cab.component.css']
})
export class QuoteCabComponent implements OnInit {

  @Input() displayForm: boolean;
  @Input() dbCustomer : Customer;
  @Input() prods : Product[];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  @Output() quoteGenerated = new EventEmitter<Quote>();

  public formError = '';

  public formQuoteItem5 : QuoteItem8 = {
    trunk: '',
    quantityT: null,
    tAmount: null,
    tDescription: null,
    tExpense: null,
    summary: null
  }

  public trunks = [];

  public counts = [];

  public currentTrunk: Product;



  public newQuotation = {
    quoteItems: [],
    summary: '',
    amount: null,
    expense: null,
    profit:null,
    author: '',
    flagged: false,
    _id: ''
  };

  public closeForm: boolean = false;

  constructor(
    private productDataService: ProductDataService,
    private authService: AuthenticationService,
  
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  formIsValid(){
    /*if(!this.formQuoteItem3.distribution || !this.formQuoteItem3.quantityDSB  ||
       !this.formQuoteItem3.consumables || !this.formQuoteItem3.quantityCons ||
       !this.formQuoteItem3.acProt|| !this.formQuoteItem3.quantityACProt ||
       !this.formQuoteItem3.cova|| !this.formQuoteItem3.quantityCov ||
       !this.formQuoteItem3.mcb|| !this.formQuoteItem3.quantityMCB ||
       !this.formQuoteItem3.surgProt|| !this.formQuoteItem3.quantitySurg ||
       !this.formQuoteItem3.avr|| !this.formQuoteItem3.quantityAvr
       ){
      return false;
    }*/
    return true;
  }

  public getProductByName(name: string): Promise<Product> {
    return this.productDataService.getProductByName(name);
  }

  public onCabSubmit() : void {
    this.formError = '';

    this.getProductByName(this.formQuoteItem5.trunk)
    .then(foundProduct => {
      this.currentTrunk = foundProduct;
      this.formQuoteItem5.tAmount = this.currentTrunk.selling;
      this.formQuoteItem5.tDescription = this.currentTrunk.description;
      this.formQuoteItem5.tExpense = this.currentTrunk.trade;
      this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityT} x ${this.currentTrunk.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem5.quantityT} x ${this.currentTrunk.name}, `;
      this.newQuotation.amount += this.formQuoteItem5.quantityT * this.currentTrunk.selling;
      this.newQuotation.profit += this.formQuoteItem5.quantityT * (this.currentTrunk.selling - this.currentTrunk.trade);
      this.newQuotation.expense += this.formQuoteItem5.quantityT * this.currentTrunk.trade; 

      this.newQuotation.quoteItems.push({
        product: this.formQuoteItem5.trunk,
        quantity: this.formQuoteItem5.quantityT,
        productAmount: this.formQuoteItem5.tAmount,
        productExpense: this.formQuoteItem5.tExpense,
        description: this.formQuoteItem5.tDescription,
        category: 'cab'
      });
                           
      if(this.formIsValid()){
        this.quoteGenerated.emit(this.newQuotation);
        this.resetAndHideQuoteForm();
      } else {
        this.formError = 'No items entered, please try again.';
      }
    });
          
  }

  
  public resetAndHideQuoteForm(){
    this.formError = '';
   // this.displayForm = false;
    this.newQuotation.quoteItems.splice(0, this.newQuotation.quoteItems.length);
    this.newQuotation.summary = '';
    this.newQuotation.profit = 0;
    this.newQuotation.expense = 0;
    this.newQuotation.amount = 0;
   // this.itemAdded = false;
    this.formClosedEvent.emit(false);
    this.displayForm = false;
    this.closeForm = true;

    this.formQuoteItem5.trunk = '';
    this.formQuoteItem5.quantityT = null;
    this.formQuoteItem5.tAmount = null;
    this.formQuoteItem5.tDescription = null;
    this.formQuoteItem5.tExpense = null;

    this.formQuoteItem5.summary = null;

    this.currentTrunk =null;  
  }

  public getTrunks(cat: string) : void {

    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'cab') {

        this.trunks.push(this.prods[i]);
      }
    }
  }
  
  
  ngOnInit() {
    this.getTrunks('wire');

    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }
}


