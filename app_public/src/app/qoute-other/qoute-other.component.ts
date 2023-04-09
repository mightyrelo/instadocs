import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { QuotationDataService } from '../quotation-data.service';
import { AuthenticationService } from '../authentication.service';
import { QuoteItem6 } from '../customer';
import { Quote } from '../customer';

@Component({
  selector: 'app-qoute-other',
  templateUrl: './qoute-other.component.html',
  styleUrls: ['./qoute-other.component.css']
})
export class QouteOtherComponent implements OnInit {

  @Input() displayForm: boolean;
  @Input() dbCustomer : Customer;
  @Input() prods : Product[];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  @Output() quoteGenerated = new EventEmitter<Quote>();

  public formError = '';

  public formQuoteItem6 : QuoteItem6 = {
    travel: '',
    quantityT: null,
    tAmount: null,
    tDescription: null,
    tExpense: null,

    assess: null,
    quantityS: null,
    sAmount: null,
    sDescription: null,
    sExpense: null,

    labour: null,
    quantityL: null,
    lAmount: null,
    lDescription: null,
    lExpense: null,

 
    summary: null

  }

  public travels = [];
  public assess = [];
  public labs = [];
  

  public counts = [];

  public currentTravel: Product;
  public currentAssess: Product;
  public currentLab: Product;
 
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

    this.getProductByName(this.formQuoteItem6.travel)
    .then(foundProduct => {
      this.currentTravel = foundProduct;
      this.formQuoteItem6.tAmount = this.currentTravel.selling;
      this.formQuoteItem6.tDescription = this.currentTravel.description;
      this.formQuoteItem6.tExpense = this.currentTravel.trade;
      this.formQuoteItem6.summary += `${this.formQuoteItem6.quantityT} x ${this.currentTravel.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem6.quantityT} x ${this.currentTravel.name}, `;
      this.newQuotation.amount += this.formQuoteItem6.quantityT * this.currentTravel.selling;
      this.newQuotation.profit += this.formQuoteItem6.quantityT * (this.currentTravel.selling - this.currentTravel.trade);
      this.newQuotation.expense += this.formQuoteItem6.quantityT * this.currentTravel.trade; 

      this.getProductByName(this.formQuoteItem6.assess)
        .then(assess => {
          this.currentAssess = assess;
            this.formQuoteItem6.sAmount = this.currentAssess.selling;
            this.formQuoteItem6.sDescription = this.currentAssess.description;
            this.formQuoteItem6.sExpense = this.currentAssess.trade;
            this.formQuoteItem6.summary += `${this.formQuoteItem6.quantityS} x ${this.currentAssess.name}, ` 
            this.newQuotation.summary += `${this.formQuoteItem6.quantityS} x ${this.currentAssess.name}, `;
            this.newQuotation.amount += this.formQuoteItem6.quantityS * this.currentAssess.selling;
            this.newQuotation.profit += this.formQuoteItem6.quantityS * (this.currentAssess.selling - this.currentAssess.trade);
            this.newQuotation.expense += this.formQuoteItem6.quantityS * this.currentAssess.trade; 
                

          this.getProductByName(this.formQuoteItem6.labour)
            .then(lab => {
              this.currentLab = lab;
              this.formQuoteItem6.lAmount = this.currentLab.selling;
              this.formQuoteItem6.lDescription = this.currentLab.description;
              this.formQuoteItem6.lExpense = this.currentLab.trade;
              this.formQuoteItem6.summary += `${this.formQuoteItem6.quantityL} x ${this.currentLab.name}, ` 
              this.newQuotation.summary += `${this.formQuoteItem6.quantityL} x ${this.currentLab.name}, `;
              this.newQuotation.amount += this.formQuoteItem6.quantityL * this.currentLab.selling;
              this.newQuotation.profit += this.formQuoteItem6.quantityL * (this.currentLab.selling - this.currentLab.trade);
              this.newQuotation.expense += this.formQuoteItem6.quantityL * this.currentLab.trade;               

              this.newQuotation.quoteItems.push({
                product: this.formQuoteItem6.travel,
                quantity: this.formQuoteItem6.quantityT,
                productAmount: this.formQuoteItem6.tAmount,
                productExpense: this.formQuoteItem6.tExpense,
                description: this.formQuoteItem6.tDescription
                });
           
            //console.log('is null?', this.formQuoteItem2.inverterAmount);
                 this.newQuotation.quoteItems.push({
                  product: this.formQuoteItem6.assess,
                  quantity: this.formQuoteItem6.quantityS,
                  productAmount: this.formQuoteItem6.sAmount,
                  productExpense: this.formQuoteItem6.sExpense,
                  description: this.formQuoteItem6.sDescription
                });
                 
                this.newQuotation.quoteItems.push({
                  product: this.formQuoteItem6.labour,
                  quantity: this.formQuoteItem6.quantityL,
                  productAmount: this.formQuoteItem6.lAmount,
                  productExpense: this.formQuoteItem6.lExpense,
                  description: this.formQuoteItem6.lDescription
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

    this.formQuoteItem6.travel = '';
    this.formQuoteItem6.quantityT = null;
    this.formQuoteItem6.tAmount = null;
    this.formQuoteItem6.tDescription = null;
    this.formQuoteItem6.tExpense = null;

    this.formQuoteItem6.assess = null;
    this.formQuoteItem6.quantityS = null;
    this.formQuoteItem6.sAmount = null;
    this.formQuoteItem6.sDescription = null;
    this.formQuoteItem6.sExpense = null;

    this.formQuoteItem6.labour = null;
    this.formQuoteItem6.quantityL = null;
    this.formQuoteItem6.lAmount = null;
    this.formQuoteItem6.lDescription = null;
    this.formQuoteItem6.lExpense = null;

    this.formQuoteItem6.summary = null;

    this.currentTravel =null;
    this.currentAssess = null;
    this.currentLab = null;

  
  }

  public getTravels(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'trvl') {
       
        this.travels.push(this.prods[i]);
      }
    }
  }
  public getAssess(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'assess') {
       
        this.assess.push(this.prods[i]);
      }
    }
  }
  public getLabours(cat: string) : void {
    console.log('inna zone');
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'lab') {
       
        this.labs.push(this.prods[i]);
      }
    }
  }
  
  ngOnInit() {
    this.getTravels('wire');
    this.getAssess('cons');
    this.getLabours('acprot');
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }

}
