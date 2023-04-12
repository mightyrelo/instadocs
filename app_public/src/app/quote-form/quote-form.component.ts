import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { AuthenticationService } from '../authentication.service';
import { Customer, Quote } from '../customer';
import { QuotationDataService } from '../quotation-data.service';
import { QuoteItem } from '../customer';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {


  @Input() dbCustomer: Customer;
  @Input() dbProducts: Product;
  @Input() displayForm3: boolean;
  @Input() displayForm: boolean;
  @Output() formClosedEvent2 = new EventEmitter<boolean>();

  //form processing
  public formError  = '';
  //public displayForm : boolean = true;

  public products : Product[];

  public counts = [];

  public itemAdded : boolean;

  public closedForm : boolean = false;

  public formCat = {
    category: ''
  };
  public categories = ['user','suv','aut','intr','pow','cab','tool','int','acc','fir','swt','efe','auto'];
  public categoriesFull = ['user','surveillance','automation','intrusion','power','cabling','tools','intercom','access control','fire','switches','electric fencing', 'automation advanced'];

  public categorySelected = false;

  public currentProduct: Product;

  public formQuoteItem : QuoteItem = {
    product: '',
    quantity: null,
    productAmount: null,
    description: 'd',
    summary: '',
    productExpense: null,
    category: null
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


  constructor(
    private productDataService: ProductDataService,
    private authService: AuthenticationService,
    private quoteDataService: QuotationDataService,
    private userDataService: UserDataService
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
      .then(foundProducts => {this.products = foundProducts;this.categorySelected = false;});
  }

  formIsValid(){
    if(!this.formQuoteItem.product || !this.formQuoteItem.quantity){
      return false;
    }
    return true;
  }

  onQuoteSubmit(){
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
        this.userDataService.getUserByName(this.getUserName())
            .then(usr => {
            usr.completedQuotes = usr.completedQuotes + 1;
            this.userDataService.updateQuotes(usr)
                .then(usr => {
                    
                });
            });
      });
    } else {
      this.formError = 'No items entered, please try again.';
    }

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
    //this.displayForm3 = false;
    this.displayForm = false;
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
    this.formClosedEvent2.emit(false);
    this.itemAdded = false;
    this.closedForm = true;

  }

  ngOnInit() : void {
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }

}
