import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { QuotationDataService } from '../quotation-data.service';
import { AuthenticationService } from '../authentication.service';
import { QuoteItem7 } from '../customer';
import { Quote } from '../customer';

@Component({
  selector: 'app-quote-prot',
  templateUrl: './quote-prot.component.html',
  styleUrls: ['./quote-prot.component.css']
})
export class QuoteProtComponent implements OnInit {

  @Input() displayForm: boolean;
  @Input() dbCustomer : Customer;
  @Input() prods : Product[];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  @Output() quoteGenerated = new EventEmitter<Quote>();

  public formError = '';

  public formQuoteItem5 : QuoteItem7 = {
    psm: '',
    quantityP: null,
    pAmount: null,
    pDescription: null,
    pExpense: null,

    fuse: null,
    quantityF: null,
    fAmount: null,
    fDescription: null,
    fExpense: null,

    box: null,
    quantityB: null,
    bAmount: null,
    bDescription: null,
    bExpense: null,

 
    summary: null

  }

  public psms = [];
  public boxes = [];
  public fuses = [];  

  public counts = [];

  public currentPSM: Product;
  public currentBox: Product;
  public currentFuse: Product;


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

  public dcBox : boolean = false;


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

  public onProtSubmit() : void {
    this.formError = '';

    this.getProductByName(this.formQuoteItem5.psm)
    .then(foundProduct => {
      this.currentPSM = foundProduct;
      this.formQuoteItem5.pAmount = this.currentPSM.selling;
      this.formQuoteItem5.pDescription = this.currentPSM.description;
      this.formQuoteItem5.pExpense = this.currentPSM.trade;
      this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityP} x ${this.currentPSM.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem5.quantityP} x ${this.currentPSM.name}, `;
      this.newQuotation.amount += this.formQuoteItem5.quantityP * this.currentPSM.selling;
      this.newQuotation.profit += this.formQuoteItem5.quantityP * (this.currentPSM.selling - this.currentPSM.trade);
      this.newQuotation.expense += this.formQuoteItem5.quantityP * this.currentPSM.trade; 

      //if(this.formQuoteItem5.fuse){
        this.getProductByName(this.formQuoteItem5.fuse)
        .then(prot => {
          this.currentFuse = prot;
          this.formQuoteItem5.fAmount = this.currentFuse.selling;
          this.formQuoteItem5.fDescription = this.currentFuse.description;
          this.formQuoteItem5.fExpense = this.currentFuse.trade;
          this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityF} x ${this.currentFuse.name}, ` 
          this.newQuotation.summary += `${this.formQuoteItem5.quantityF} x ${this.currentFuse.name}, `;
          this.newQuotation.amount += this.formQuoteItem5.quantityF * this.currentFuse.selling;
          this.newQuotation.profit += this.formQuoteItem5.quantityF * (this.currentFuse.selling - this.currentFuse.trade);
          this.newQuotation.expense += this.formQuoteItem5.quantityF * this.currentFuse.trade;
          //if(this.formQuoteItem5.box){
            this.getProductByName(this.formQuoteItem5.box)
            .then(box => {
              if(box.name != 'default'){
                this.currentBox = box;
                this.formQuoteItem5.bAmount = this.currentBox.selling;
                this.formQuoteItem5.bDescription = this.currentBox.description;
                this.formQuoteItem5.bExpense = this.currentBox.trade;
                this.formQuoteItem5.summary += `${this.formQuoteItem5.quantityB} x ${this.currentBox.name}, ` 
                this.newQuotation.summary += `${this.formQuoteItem5.quantityB} x ${this.currentBox.name}, `;
                this.newQuotation.amount += this.formQuoteItem5.quantityB * this.currentBox.selling;
                this.newQuotation.profit += this.formQuoteItem5.quantityB * (this.currentBox.selling - this.currentBox.trade);
                this.newQuotation.expense += this.formQuoteItem5.quantityB * this.currentBox.trade;
              }
              
              this.newQuotation.quoteItems.push({
                product: this.formQuoteItem5.psm,
                quantity: this.formQuoteItem5.quantityP,
                productAmount: this.formQuoteItem5.pAmount,
                productExpense: this.formQuoteItem5.pExpense,
                description: this.formQuoteItem5.pDescription,
                category: 'prot'
                });
                           
                this.newQuotation.quoteItems.push({
                    product: this.formQuoteItem5.fuse,
                    quantity: this.formQuoteItem5.quantityF,
                    productAmount: this.formQuoteItem5.fAmount,
                    productExpense: this.formQuoteItem5.fExpense,
                    description: this.formQuoteItem5.fDescription,
                    category: 'prot'
                });

                if(this.formQuoteItem5.box){
                  this.newQuotation.quoteItems.push({
                    product: this.formQuoteItem5.box,
                    quantity: this.formQuoteItem5.quantityB,
                    productAmount: this.formQuoteItem5.bAmount,
                    productExpense: this.formQuoteItem5.bExpense,
                    description: this.formQuoteItem5.bDescription,
                    category: 'prot'
                  });
                }
                
                 
                if(this.formIsValid()){
                  this.quoteGenerated.emit(this.newQuotation);
                  this.resetAndHideQuoteForm();
                } else {
                  this.formError = 'No items entered, please try again.';
                }
            });
          
        });
      
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

    this.formQuoteItem5.psm = '';
    this.formQuoteItem5.quantityP = null;
    this.formQuoteItem5.pAmount = null;
    this.formQuoteItem5.pDescription = null;
    this.formQuoteItem5.pExpense = null;

    this.formQuoteItem5.fuse = null;
    this.formQuoteItem5.quantityF = null;
    this.formQuoteItem5.fAmount = null;
    this.formQuoteItem5.fDescription = null;
    this.formQuoteItem5.fExpense = null;

    this.formQuoteItem5.box = null;
    this.formQuoteItem5.quantityB = null;
    this.formQuoteItem5.bAmount = null;
    this.formQuoteItem5.bDescription = null;
    this.formQuoteItem5.bExpense = null;

    this.formQuoteItem5.summary = null;

    this.currentPSM =null;
    this.currentFuse = null;
    this.currentBox =null;
  
  }

  public getPSMs(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'psm') {
       
        this.psms.push(this.prods[i]);
      }
    }
  }
  public getFuses(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'fuse') {
       
        this.fuses.push(this.prods[i]);
      }
    }
  }
  public getBoxes(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'box') {
       
        this.boxes.push(this.prods[i]);
      }
    }
  }
  
  ngOnInit() {
    this.getPSMs('wire');
    this.getFuses('cons');
    this.getBoxes('acprot');
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }
}
