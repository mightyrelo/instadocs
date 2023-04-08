import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { QuotationDataService } from '../quotation-data.service';
import { AuthenticationService } from '../authentication.service';
import { QuoteItem3 } from '../customer';
import { Quote } from '../customer';

@Component({
  selector: 'app-qoute-ac',
  templateUrl: './qoute-ac.component.html',
  styleUrls: ['./qoute-ac.component.css']
})
export class QouteAcComponent implements OnInit {

  @Input() dbCustomer: Customer;
  @Input() prods: Product[];
  @Input() displayForm: boolean;
  @Output() formClosedEvent  = new EventEmitter<boolean>();

  public formError = '';

  public formQuoteItem3 : QuoteItem3 = {
    distribution: '',
    quantityDSB: null,
    dsbAmount: null,
    dsbDescription: null,
    dsbExpense: null,

    consumables: null,
    quantityCons: null,
    consAmount: null,
    consDescription: null,
    consExpense: null,

    acProt: null,
    quantityACProt: null,
    acProtAmount: null,
    acProtDescription: null,
    acProtExpense: null,

    cova: null,
    quantityCov: null,
    covAmount: null,
    covDescription: null,
    covExpense: null,

    mcb: null,
    quantityMCB: null,
    mcbAmount: null,
    mcbDescription: null,
    mcbExpense: null,

    surgProt: null,
    quantitySurg: null,
    surgAmount: null,
    surgDescription: null,
    surgExpense: null,

    avr: null,
    quantityAvr: null,
    avrAmount: null,
    avrDescription: null,
    avrExpense: null,

    summary: null

  }

  public avrs = [];
  public surgeProts = [];
  public mcbs = [];
  public chovas = [];
  public acProts = [];
  public cons = [];
  public dbs = [];

  public counts = [];

  public currentDB: Product;
  public currentCons: Product;
  public currentACProt: Product;
  public currentCOV: Product;
  public currentMCB: Product;
  public currentSurgProt: Product;
  public currentAVR: Product;



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

    this.getProductByName(this.formQuoteItem3.distribution)
    .then(foundProduct => {
      console.log(foundProduct.name);
      this.currentDB = foundProduct;
      this.formQuoteItem3.dsbAmount = this.currentDB.selling;
      this.formQuoteItem3.dsbDescription = this.currentDB.description;
      this.formQuoteItem3.dsbExpense = this.currentDB.trade;
      this.formQuoteItem3.summary += `${this.formQuoteItem3.quantityDSB} x ${this.currentDB.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem3.quantityDSB} x ${this.currentDB.name}, `;
      this.newQuotation.amount += this.formQuoteItem3.quantityDSB * this.currentDB.selling;
      this.newQuotation.profit += this.formQuoteItem3.quantityDSB * (this.currentDB.selling - this.currentDB.trade);
      this.newQuotation.expense += this.formQuoteItem3.quantityDSB * this.currentDB.trade; 

      this.getProductByName(this.formQuoteItem3.consumables)
        .then(cons => {
          this.currentCons = cons;
          this.formQuoteItem3.consAmount = this.currentCons.selling;
          this.formQuoteItem3.consDescription = this.currentCons.description;
          this.formQuoteItem3.consExpense = this.currentCons.trade;
          this.formQuoteItem3.summary += `${this.formQuoteItem3.quantityCons} x ${this.currentCons.name}, ` 
          this.newQuotation.summary += `${this.formQuoteItem3.quantityCons} x ${this.currentCons.name}, `;
          this.newQuotation.amount += this.formQuoteItem3.quantityCons * this.currentCons.selling;
          this.newQuotation.profit += this.formQuoteItem3.quantityCons * (this.currentCons.selling - this.currentCons.trade);
          this.newQuotation.expense += this.formQuoteItem3.quantityCons * this.currentCons.trade;
          

          this.getProductByName(this.formQuoteItem3.acProt)
            .then(acProt => {
              this.currentACProt = acProt;
              this.formQuoteItem3.acProtAmount = this.currentACProt.selling;
              this.formQuoteItem3.acProtDescription = this.currentACProt.description;
              this.formQuoteItem3.acProtExpense = this.currentACProt.trade;
              this.formQuoteItem3.summary += `${this.formQuoteItem3.quantityACProt} x ${this.currentACProt.name}, ` 
              this.newQuotation.summary += `${this.formQuoteItem3.quantityACProt} x ${this.currentACProt.name}, `;
              this.newQuotation.amount += this.formQuoteItem3.quantityACProt * this.currentACProt.selling;
              this.newQuotation.profit += this.formQuoteItem3.quantityACProt * (this.currentACProt.selling - this.currentACProt.trade);
              this.newQuotation.expense += this.formQuoteItem3.quantityACProt * this.currentACProt.trade;
          

              this.getProductByName(this.formQuoteItem3.cova)
                .then(cova => {
                  this.currentCOV = cova;
                  this.formQuoteItem3.covAmount = this.currentCOV.selling;
                  this.formQuoteItem3.covDescription = this.currentCOV.description;
                  this.formQuoteItem3.covExpense = this.currentCOV.trade;
                  this.formQuoteItem3.summary += `${this.formQuoteItem3.quantityCov} x ${this.currentCOV.name}, ` 
                  this.newQuotation.summary += `${this.formQuoteItem3.quantityCov} x ${this.currentCOV.name}, `;
                  this.newQuotation.amount += this.formQuoteItem3.quantityCov * this.currentCOV.selling;
                  this.newQuotation.profit += this.formQuoteItem3.quantityCov * (this.currentCOV.selling - this.currentCOV.trade);
                  this.newQuotation.expense += this.formQuoteItem3.quantityCov * this.currentCOV.trade;
                 
                  this.getProductByName(this.formQuoteItem3.mcb)
                    .then(mcb => {
                      this.currentMCB = mcb;
                      this.formQuoteItem3.mcbAmount = this.currentMCB.selling;
                      this.formQuoteItem3.mcbDescription = this.currentMCB.description;
                      this.formQuoteItem3.mcbExpense = this.currentMCB.trade;
                      this.formQuoteItem3.summary += `${this.formQuoteItem3.quantityCov} x ${this.currentMCB.name}, ` 
                      this.newQuotation.summary += `${this.formQuoteItem3.quantityCov} x ${this.currentMCB.name}, `;
                      this.newQuotation.amount += this.formQuoteItem3.quantityCov * this.currentMCB.selling;
                      this.newQuotation.profit += this.formQuoteItem3.quantityCov * (this.currentMCB.selling - this.currentMCB.trade);
                      this.newQuotation.expense += this.formQuoteItem3.quantityCov * this.currentMCB.trade;
                      console.log(this.formQuoteItem3.surgProt);
                      this.getProductByName(this.formQuoteItem3.surgProt)
                        .then(surProt => {
                          this.currentSurgProt = surProt;
                          this.formQuoteItem3.surgAmount = this.currentSurgProt.selling;
                          this.formQuoteItem3.surgDescription = this.currentSurgProt.description;
                          this.formQuoteItem3.surgExpense = this.currentSurgProt.trade;
                          this.formQuoteItem3.summary += `${this.formQuoteItem3.quantitySurg} x ${this.currentSurgProt.name}, ` 
                          this.newQuotation.summary += `${this.formQuoteItem3.quantitySurg} x ${this.currentSurgProt.name}, `;
                          this.newQuotation.amount += this.formQuoteItem3.quantitySurg * this.currentSurgProt.selling;
                          this.newQuotation.profit += this.formQuoteItem3.quantitySurg * (this.currentSurgProt.selling - this.currentSurgProt.trade);
                          this.newQuotation.expense += this.formQuoteItem3.quantitySurg * this.currentSurgProt.trade;

                          this.getProductByName(this.formQuoteItem3.avr)
                            .then(av => {
                              this.currentAVR = av;
                              this.formQuoteItem3.avrAmount = this.currentAVR.selling;
                              this.formQuoteItem3.avrDescription = this.currentAVR.description;
                              this.formQuoteItem3.avrExpense = this.currentAVR.trade;
                              this.formQuoteItem3.summary += `${this.formQuoteItem3.quantityCov} x ${this.currentAVR.name}, ` 
                              this.newQuotation.summary += `${this.formQuoteItem3.quantityCov} x ${this.currentAVR.name}, `;
                              this.newQuotation.amount += this.formQuoteItem3.quantityCov * this.currentAVR.selling;
                              this.newQuotation.profit += this.formQuoteItem3.quantityCov * (this.currentAVR.selling - this.currentAVR.trade);
                              this.newQuotation.expense += this.formQuoteItem3.quantityCov * this.currentAVR.trade;


                              this.newQuotation.quoteItems.push({
                                product: this.formQuoteItem3.distribution,
                                quantity: this.formQuoteItem3.quantityDSB,
                                productAmount: this.formQuoteItem3.dsbAmount,
                                productExpense: this.formQuoteItem3.dsbExpense,
                                description: this.formQuoteItem3.dsbDescription
                                });
                           
                            //console.log('is null?', this.formQuoteItem2.inverterAmount);
                                 this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem3.consumables,
                                  quantity: this.formQuoteItem3.quantityCons,
                                  productAmount: this.formQuoteItem3.consAmount,
                                  productExpense: this.formQuoteItem3.consExpense,
                                  description: this.formQuoteItem3.consDescription
                                
                                });
                                 
                                this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem3.acProt,
                                  quantity: this.formQuoteItem3.quantityACProt,
                                  productAmount: this.formQuoteItem3.acProtAmount,
                                  productExpense: this.formQuoteItem3.acProtExpense,
                                  description: this.formQuoteItem3.acProtDescription
                                });
                                 
                                this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem3.cova,
                                  quantity: this.formQuoteItem3.quantityCov,
                                  productAmount: this.formQuoteItem3.covAmount,
                                  productExpense: this.formQuoteItem3.covExpense,
                                  description: this.formQuoteItem3.covDescription
                                });
                      
                                this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem3.mcb,
                                  quantity: this.formQuoteItem3.quantityMCB,
                                  productAmount: this.formQuoteItem3.mcbAmount,
                                  productExpense: this.formQuoteItem3.mcbExpense,
                                  description: this.formQuoteItem3.mcbDescription
                                });

                                this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem3.surgProt,
                                  quantity: this.formQuoteItem3.quantitySurg,
                                  productAmount: this.formQuoteItem3.surgAmount,
                                  productExpense: this.formQuoteItem3.surgExpense,
                                  description: this.formQuoteItem3.surgDescription
                                });

                                this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem3.avr,
                                  quantity: this.formQuoteItem3.quantityAvr,
                                  productAmount: this.formQuoteItem3.avrAmount,
                                  productExpense: this.formQuoteItem3.avrExpense,
                                  description: this.formQuoteItem3.avrDescription
                                });
                               this.doSubmitQuote();
                            });
                        });
                    });
                });
            });
        });
       // this.itemAdded = true;
    }); 

  }

  public doSubmitQuote() : void {
    this.formError = '';
    //this.itemAdded = false;
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
    this.newQuotation.quoteItems.splice(0, this.newQuotation.quoteItems.length);
    this.newQuotation.summary = '';
    this.newQuotation.profit = 0;
    this.newQuotation.expense = 0;
    this.newQuotation.amount = 0;
   // this.itemAdded = false;
    this.formClosedEvent.emit(false);
    this.displayForm = false;
    this.closeForm = true;

    this.formQuoteItem3.distribution = '';
    this.formQuoteItem3. quantityDSB = null;
    this.formQuoteItem3.dsbAmount = null;
    this.formQuoteItem3.dsbDescription = null;
    this.formQuoteItem3.dsbExpense = null;

    this.formQuoteItem3.consumables = null;
    this.formQuoteItem3.quantityCons = null;
    this.formQuoteItem3.consAmount = null;
    this.formQuoteItem3.consDescription = null;
    this.formQuoteItem3.consExpense = null;

    this.formQuoteItem3.acProt = null;
    this.formQuoteItem3.quantityACProt = null;
    this.formQuoteItem3.acProtAmount = null;
    this.formQuoteItem3.acProtDescription = null;
    this.formQuoteItem3.acProtExpense = null;

    this.formQuoteItem3.cova = null;
    this.formQuoteItem3.quantityCov = null;
    this.formQuoteItem3.covAmount = null;
    this.formQuoteItem3.covDescription = null;
    this.formQuoteItem3.covExpense = null;

    this.formQuoteItem3.mcb = null;
    this.formQuoteItem3.quantityMCB = null;
    this.formQuoteItem3.mcbAmount = null;
    this.formQuoteItem3.mcbDescription = null;
    this.formQuoteItem3.mcbExpense = null;

    this.formQuoteItem3.surgProt = null;
    this.formQuoteItem3.quantitySurg = null;
    this.formQuoteItem3.surgAmount = null;
    this.formQuoteItem3.surgDescription = null;
    this.formQuoteItem3.surgExpense = null;

    this.formQuoteItem3.avr = null;
    this.formQuoteItem3.quantityAvr = null;
    this.formQuoteItem3.avrAmount = null;
    this.formQuoteItem3.avrDescription = null;
    this.formQuoteItem3.avrExpense = null;

    this.formQuoteItem3.summary = null;

    this.currentDB =null;
    this.currentCons = null;
  this.currentACProt =null;
  this.currentCOV = null;
  this.currentMCB = null;
  this.currentSurgProt = null;
  this.currentAVR = null;

  
  }

  public getDBs(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'din') {
       
        this.dbs.push(this.prods[i]);
      }
    }
  }
  public getCons(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'cons') {
       
        this.cons.push(this.prods[i]);
      }
    }
  }
  public getACProts(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'acprot') {
       
        this.acProts.push(this.prods[i]);
      }
    }
  }
  public getChovas(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'chover') {
       
        this.chovas.push(this.prods[i]);
      }
    }
  }
  public getMCBs(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'mcb') {
       
        this.mcbs.push(this.prods[i]);
      }
    }
  }
  public getSurgeProts(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'surgprot') {
       
        this.surgeProts.push(this.prods[i]);
      }
    }
  }
  public getAVRs(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'avr') {
       
        this.avrs.push(this.prods[i]);
      }
    }
  }

  

  ngOnInit() {
    this.getDBs('din');
    this.getCons('cons');
    this.getACProts('acprot');
    this.getChovas('chover');
    this.getMCBs('mcb');
    this.getSurgeProts('surgprot');
    this.getAVRs('avr');
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }

}
