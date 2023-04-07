import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { AuthenticationService } from '../authentication.service';
import { Customer, Quote } from '../customer';
import { QuotationDataService } from '../quotation-data.service';
import { QuoteItem } from '../customer';
import {QuoteItem2} from '../customer';



@Component({
  selector: 'app-qoute-pv',
  templateUrl: './qoute-pv.component.html',
  styleUrls: ['./qoute-pv.component.css']
})
export class QoutePvComponent implements OnInit {

  @Input() dbCustomer: Customer;
  @Input() displayForm: boolean;
  @Output() formClosedEvent = new EventEmitter<boolean>();
  @Input() prods : Product[];

  public closeForm : boolean = false;

  //form processing
  public formError  = '';

  public products : Product[];

  public counts = [];

  public itemAdded : boolean;

  public formCat = {
    category: ''
  };
  public categories = ['user','pv','wire','wiretru','flex','earth','batt','weld','pvc'];
  public categoriesFull = ['user','photovoltaic','trunking','flex','earth','battery','welding','pvc'];

  public categorySelected = false;

  public currentProduct: Product;
  public currentPanel: Product;
  public currentInverter: Product;
  public currentRoof: Product;

  public formQuoteItem : QuoteItem = {
    product: '',
    quantity: null,
    productAmount: null,
    description: 'd',
    summary: '',
    productExpense: null,

  }

  public formQuoteItem2 : QuoteItem2 = {
    panel: '',
    quantityP: null,
    panelAmount: null,
    inverter: '',
    quantityI: null,
    inverterAmount: null,
    roof: '',
    quantityR: null,
    roofAmount: null,
    pvAmount: null,
    description: '',
    summary: null,

    panelExpense: null,
    inverterExpense: null,
    roofExpense: null,
    roofDescription: null,
    panelDescription: null,
    invDescription: null

  }

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

  public panels = [];
  public roofs = [];
  public inverters = [];


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

  public onCategorySubmit() : void {
    //this.formError2 = '';
    const idx = this.categoriesFull.indexOf(this.formCat.category);
    this.productDataService.getCategoryProducts(this.getUserName(), this.categories[idx])
      .then(foundProducts => {
        this.products = foundProducts;
        this.categorySelected = false;
      });
  }

  public getPanels(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'panel') {
        console.log('same panels');
        this.panels.push(this.prods[i]);
      }
    }
  }
  public getRoofs(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'roof') {
        console.log('same roofs'); 
        this.roofs.push(this.prods[i]);
      }
    }
  }

  public getInveters(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'inv') {
        console.log('same inverters');
        this.inverters.push(this.prods[i]);
      }
    }
  }

  formIsValid(){
    if(!this.formQuoteItem2.panel || !this.formQuoteItem2.quantityP  || !this.formQuoteItem2.inverter
       || !this.formQuoteItem2.quantityI || !this.formQuoteItem2.roof || !this.formQuoteItem2.quantityR){
      return false;
    }
    return true;
  }

  public getProductByName(name: string): Promise<Product> {
    return this.productDataService.getProductByName(name);
  }

  public onQuoteSubmit() : void {
    this.formError = '';

    this.getProductByName(this.formQuoteItem2.panel)
    .then(foundProduct => {
      this.currentPanel = foundProduct;
      this.formQuoteItem2.panelAmount = this.currentPanel.selling;
      this.formQuoteItem2.panelDescription = this.currentPanel.description;
      this.formQuoteItem2.panelExpense = this.currentPanel.trade;
      this.formQuoteItem2.summary += `${this.formQuoteItem2.quantityP} x ${this.currentPanel.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem2.quantityP} x ${this.currentPanel.name}, `;
      this.newQuotation.amount += this.formQuoteItem2.quantityP * this.currentPanel.selling;
      this.newQuotation.profit += this.formQuoteItem2.quantityP * (this.currentPanel.selling - this.currentPanel.trade);
      this.newQuotation.expense += this.formQuoteItem2.quantityP * this.currentPanel.trade; 

      this.getProductByName(this.formQuoteItem2.inverter)
        .then(inverter => {
          this.currentInverter = inverter;
          this.formQuoteItem2.inverterAmount = this.currentInverter.selling;
          this.formQuoteItem2.invDescription = this.currentInverter.description;
          this.formQuoteItem2.inverterExpense = this.currentInverter.trade;
          this.formQuoteItem2.summary += `${this.formQuoteItem2.quantityI} x ${this.currentInverter.name}, ` 
          this.newQuotation.summary += `${this.formQuoteItem2.quantityI} x ${this.currentInverter.name}, `;
          this.newQuotation.amount += this.formQuoteItem2.quantityI * this.currentInverter.selling;
          this.newQuotation.profit += this.formQuoteItem2.quantityI * (this.currentInverter.selling - this.currentInverter.trade);
          this.newQuotation.expense += this.formQuoteItem2.quantityI * this.currentInverter.trade;

          this.getProductByName(this.formQuoteItem2.roof)
            .then(roof => {
              this.currentRoof = roof;
              this.formQuoteItem2.roofAmount = this.currentRoof.selling;
              this.formQuoteItem2.roofDescription = this.currentRoof.description;
               this.formQuoteItem2.roofExpense = this.currentRoof.trade;
              this.formQuoteItem2.summary += `${this.formQuoteItem2.quantityR} x ${this.currentRoof.name}, ` 
              this.newQuotation.summary += `${this.formQuoteItem2.quantityR} x ${this.currentRoof.name}, `;
              this.newQuotation.amount += this.formQuoteItem2.quantityR * this.currentRoof.selling;
               this.newQuotation.profit += this.formQuoteItem2.quantityR * (this.currentRoof.selling - this.currentRoof.trade);
              this.newQuotation.expense += this.formQuoteItem2.quantityR * this.currentRoof.trade;

                this.newQuotation.quoteItems.push({
                product: this.formQuoteItem2.panel,
                quantity: this.formQuoteItem2.quantityP,
                productAmount: this.formQuoteItem2.panelAmount,
                productExpense: this.formQuoteItem2.panelExpense,
                description: this.formQuoteItem2.panelDescription
              });
           
            //console.log('is null?', this.formQuoteItem2.inverterAmount);
              this.newQuotation.quoteItems.push({
                product: this.formQuoteItem2.inverter,
                quantity: this.formQuoteItem2.quantityI,
               productAmount: this.formQuoteItem2.inverterAmount,
                productExpense: this.formQuoteItem2.inverterExpense,
               description: this.formQuoteItem2.invDescription
             });
          
              this.newQuotation.quoteItems.push({
                product: this.formQuoteItem2.roof,
                quantity: this.formQuoteItem2.quantityR,
                productAmount: this.formQuoteItem2.roofAmount,
                 productExpense: this.formQuoteItem2.roofExpense,
                description: this.formQuoteItem2.roofDescription
             });
      
            this.doSubmitQuote();
            });

        });

        this.itemAdded = true;
    }); 

  }

  public doSubmitQuote() : void {
    this.formError = '';
    this.itemAdded = false;
    if(this.formIsValid()) {
      //get last item and set its summary
      this.quoteDataService.addQuote(this.dbCustomer._id, this.newQuotation)
      .then((quotation: Quote) => {
        console.log('quotation saved', quotation);
        let quotes = this.dbCustomer.quotations.slice(0);
        quotes.unshift(quotation);
        this.dbCustomer.quotations = quotes;
        this.resetAndHideQuoteForm();
      });
    } else {
      this.formError = 'No items entered, please try again.';
    }

  }

  
  public resetAndHideQuoteForm(){
    this.formError = '';
   // this.displayForm = false;
    this.formQuoteItem.product = '';
    this.formQuoteItem.quantity = null;
    this.newQuotation.quoteItems.splice(0, this.newQuotation.quoteItems.length);
    this.newQuotation.summary = '';
    this.newQuotation.profit = 0;
    this.newQuotation.expense = 0;
    this.newQuotation.amount = 0;
    this.currentProduct = null;
    this.itemAdded = false;
    this.formClosedEvent.emit(false);
    this.displayForm = false;
    this.closeForm = true;
    this.formQuoteItem2.panel =  null;
    this.formQuoteItem2.quantityP = null;
    this.formQuoteItem2.panelAmount = 0;
    this.formQuoteItem2.inverter =  null;
    this.formQuoteItem2.quantityI = null;
    this.formQuoteItem2.inverterAmount = null;
    this.formQuoteItem2.roof =  null;
    this.formQuoteItem2.quantityR = null;
    this.formQuoteItem2.roofAmount = null;
    this.formQuoteItem2.pvAmount = null;
    this.formQuoteItem2.description = null;
    this.formQuoteItem2.summary = null;

    this.formQuoteItem2.panelExpense = null;
    this.formQuoteItem2.inverterExpense = null;
    this.formQuoteItem2.roofExpense = null;
    this.formQuoteItem2.roofDescription = null;
    this.formQuoteItem2.panelDescription = null;
    this.formQuoteItem2.invDescription = null;

  }

  ngOnInit() : void {
    this.getPanels('panel');
    this.getInveters('inv');
    this.getRoofs('roof');
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }
  

}
