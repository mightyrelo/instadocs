import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { QuotationDataService } from '../quotation-data.service';
import { AuthenticationService } from '../authentication.service';
import { QuoteItem5 } from '../customer';
import { Quote } from '../customer';

@Component({
  selector: 'app-qoute-bat',
  templateUrl: './qoute-bat.component.html',
  styleUrls: ['./qoute-bat.component.css']
})
export class QouteBatComponent implements OnInit {
  @Input() displayForm: boolean;
  @Input() dbCustomer : Customer;
  @Input() prods : Product[];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  @Output() quoteGenerated = new EventEmitter<Quote>();

  public formError = '';

  public formQuoteItem5 : QuoteItem5 = {
    batt: '',
    quantityB: null,
    bAmount: null,
    bDescription: null,
    bExpense: null,

    prot: null,
    quantityP: null,
    pAmount: null,
    pDescription: null,
    pExpense: null,

    stand: null,
    quantityS: null,
    sAmount: null,
    sDescription: null,
    sExpense: null,

 
    summary: null

  }

  public batts = [];
  public prots = [];
  public cabs = [];
  public stands = [];
  

  public counts = [];

  public currentBatt: Product;
  public currentProt: Product;
  public currentCab: Product;
  public currentStand: Product;

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
    private quoteDataService: QuotationDataService


  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
     return name ? name : 'Guest'
    }
    return 'Guest';
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

  public onQuoteSubmit() : void {
    this.formError = '';

    this.getProductByName(this.formQuoteItem5.batt)
    .then(foundProduct => {
      this.currentBatt = foundProduct;
      this.formQuoteItem5.bAmount = this.currentBatt.selling;
      this.formQuoteItem5.bDescription = this.currentBatt.description;
      this.formQuoteItem5.bExpense = this.currentBatt.trade;
      this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityB} x ${this.currentBatt.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem5.quantityB} x ${this.currentBatt.name}, `;
      this.newQuotation.amount += this.formQuoteItem5.quantityB * this.currentBatt.selling;
      this.newQuotation.profit += this.formQuoteItem5.quantityB * (this.currentBatt.selling - this.currentBatt.trade);
      this.newQuotation.expense += this.formQuoteItem5.quantityB * this.currentBatt.trade; 

      this.getProductByName(this.formQuoteItem5.prot)
        .then(prot => {
          this.currentProt = prot;
          this.formQuoteItem5.pAmount = this.currentProt.selling;
          this.formQuoteItem5.pDescription = this.currentProt.description;
          this.formQuoteItem5.pExpense = this.currentProt.trade;
          this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityP} x ${this.currentProt.name}, ` 
          this.newQuotation.summary += `${this.formQuoteItem5.quantityP} x ${this.currentProt.name}, `;
          this.newQuotation.amount += this.formQuoteItem5.quantityP * this.currentProt.selling;
          this.newQuotation.profit += this.formQuoteItem5.quantityP * (this.currentProt.selling - this.currentProt.trade);
          this.newQuotation.expense += this.formQuoteItem5.quantityP * this.currentProt.trade;
          

          this.getProductByName(this.formQuoteItem5.stand)
            .then(stand => {
              this.currentStand = stand;
              this.formQuoteItem5.sAmount = this.currentStand.selling;
              this.formQuoteItem5.sDescription = this.currentStand.description;
              this.formQuoteItem5.sExpense = this.currentStand.trade;
              this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityS} x ${this.currentStand.name}, ` 
              this.newQuotation.summary += `${this.formQuoteItem5.quantityS} x ${this.currentStand.name}, `;
              this.newQuotation.amount += this.formQuoteItem5.quantityS * this.currentStand.selling;
              this.newQuotation.profit += this.formQuoteItem5.quantityS * (this.currentStand.selling - this.currentStand.trade);
              this.newQuotation.expense += this.formQuoteItem5.quantityS * this.currentStand.trade;

              this.newQuotation.quoteItems.push({
                product: this.formQuoteItem5.batt,
                quantity: this.formQuoteItem5.quantityB,
                productAmount: this.formQuoteItem5.bAmount,
                productExpense: this.formQuoteItem5.bExpense,
                description: this.formQuoteItem5.bDescription,
                category: 'batt'
                });
           
            //console.log('is null?', this.formQuoteItem2.inverterAmount);
                 this.newQuotation.quoteItems.push({
                  product: this.formQuoteItem5.prot,
                  quantity: this.formQuoteItem5.quantityP,
                  productAmount: this.formQuoteItem5.pAmount,
                  productExpense: this.formQuoteItem5.pExpense,
                  description: this.formQuoteItem5.pDescription,
                  category: 'batt'
                });
                 
                this.newQuotation.quoteItems.push({
                  product: this.formQuoteItem5.stand,
                  quantity: this.formQuoteItem5.quantityS,
                  productAmount: this.formQuoteItem5.sAmount,
                  productExpense: this.formQuoteItem5.sExpense,
                  description: this.formQuoteItem5.sDescription,
                  category: 'batt'
                });
                if(this.formIsValid()){
                  this.quoteGenerated.emit(this.newQuotation);
                  this.resetAndHideQuoteForm();
                } else {
                  this.formError = 'No items entered, please try again.';
                }
            });
        });
       // this.itemAdded = true;
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

    this.formQuoteItem5.batt = '';
    this.formQuoteItem5.quantityB = null;
    this.formQuoteItem5.bAmount = null;
    this.formQuoteItem5.bDescription = null;
    this.formQuoteItem5.bExpense = null;

    this.formQuoteItem5.prot = null;
    this.formQuoteItem5.quantityP = null;
    this.formQuoteItem5.pAmount = null;
    this.formQuoteItem5.pDescription = null;
    this.formQuoteItem5.pExpense = null;

    this.formQuoteItem5.stand = null;
    this.formQuoteItem5.quantityS = null;
    this.formQuoteItem5.sAmount = null;
    this.formQuoteItem5.sDescription = null;
    this.formQuoteItem5.sExpense = null;

    this.formQuoteItem5.summary = null;

    this.currentBatt =null;
    this.currentStand = null;
    this.currentProt =null;
    this.currentCab = null;

  
  }

  public getBatts(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'batt') {
       
        this.batts.push(this.prods[i]);
      }
    }
  }
  public getProts(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'batprot') {
       
        this.prots.push(this.prods[i]);
      }
    }
  }
  public getStands(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'batstand') {
       
        this.stands.push(this.prods[i]);
      }
    }
  }
  
  ngOnInit() {
    this.getBatts('wire');
    this.getProts('cons');
    this.getStands('acprot');
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }

 

}
