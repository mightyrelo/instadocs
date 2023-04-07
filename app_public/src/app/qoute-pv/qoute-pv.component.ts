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
    productExpense: null

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
    if(!this.formQuoteItem.product || !this.formQuoteItem.quantity){
      return false;
    }
    return true;
  }

  onQuoteSubmit(){
    this.productDataService.getCategoryProducts(this.getUserName(), 'PV')
      .then(foundProducts => {
        this.products = foundProducts;
        this.categorySelected = false;
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
      });
  }

  public getProductByName(name: string): Promise<Product> {
    return this.productDataService.getProductByName(name);
  }

  public addItemToQuote() : void {
    
    this.formError = '';

    this.getProductByName(this.formQuoteItem.product)
    .then(foundProduct => {
      this.currentProduct = foundProduct;
      this.formQuoteItem.productAmount = this.currentProduct.selling;
      this.formQuoteItem.description = this.currentProduct.description;
      this.formQuoteItem.productExpense = this.currentProduct.trade;
      this.formQuoteItem.summary += `${this.formQuoteItem.quantity} x ${this.currentProduct.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem.quantity} x ${this.currentProduct.name}, `;
      this.newQuotation.amount += this.formQuoteItem.quantity * this.currentProduct.selling;
      this.newQuotation.profit += this.formQuoteItem.quantity * (this.currentProduct.selling - this.currentProduct.trade);
      this.newQuotation.expense += this.formQuoteItem.quantity * this.currentProduct.trade; 

      this.itemAdded = true;

      this.newQuotation.quoteItems.push({
        product: this.formQuoteItem.product,
        quantity: this.formQuoteItem.quantity,
        productAmount: this.formQuoteItem.productAmount,
        productExpense: this.formQuoteItem.productExpense,
        description: this.formQuoteItem.description
      });
     
    }); 
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
    this.formQuoteItem.summary = '';
    this.formQuoteItem.productAmount = null;
    this.formQuoteItem.productExpense = null;
    this.itemAdded = false;
    this.formClosedEvent.emit(false);
    this.displayForm = false;
    this.closeForm = true;

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
