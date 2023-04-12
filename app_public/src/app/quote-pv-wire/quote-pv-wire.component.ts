import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer } from '../customer';
import { Product } from '../product';
import { QuoteItem4 } from '../customer';
import { ProductDataService } from '../product-data.service';
import { QuotationDataService } from '../quotation-data.service';
import { AuthenticationService } from '../authentication.service';
import { Quote } from '../customer';

@Component({
  selector: 'app-quote-pv-wire',
  templateUrl: './quote-pv-wire.component.html',
  styleUrls: ['./quote-pv-wire.component.css']
})
export class QuotePvWireComponent implements OnInit {

  @Input() displayForm: boolean;
  @Input() dbCustomer : Customer;
  @Input() prods : Product[];
  @Output() formClosedEvent = new EventEmitter<boolean>();
  @Output() quoteGenerated = new EventEmitter<Quote>();

  public formError = '';

  public formQuoteItem4 : QuoteItem4 = {
    pvwire: '',
    quantityW: null,
    wAmount: null,
    wDescription: null,
    wExpense: null,

    trail: null,
    quantityTR: null,
    trAmount: null,
    trDescription: null,
    trExpense: null,

    flex: null,
    quantityFL: null,
    flAmount: null,
    flDescription: null,
    flExpense: null,

    earth: null,
    quantityE: null,
    eAmount: null,
    eDescription: null,
    eExpense: null,

    batt: null,
    quantityB: null,
    bAmount: null,
    bDescription: null,
    bExpense: null,

    weld: null,
    quantityWE: null,
    weAmount: null,
    weDescription: null,
    weExpense: null,

    arm: null,
    quantityA: null,
    aAmount: null,
    aDescription: null,
    aExpense: null,

    summary: null

  }

  public arms = [];
  public welds = [];
  public batts = [];
  public trails = [];
  public wires = [];
  public flexes = [];
  public earths = [];

  public counts = [];

  public currentW: Product;
  public currentTR: Product;
  public currentFL: Product;
  public currentEa: Product;
  public currentBatt: Product;
  public currentWeld: Product;
  public currentArm: Product;

  public trailingCable : boolean = false;
  public weldCable : boolean = false;
  public armour : boolean = false;
  public earthCable : boolean = false;

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

    this.getProductByName(this.formQuoteItem4.pvwire)
    .then(foundProduct => {
      this.currentW = foundProduct;
      console.log('hole in one', this.currentW);
      this.formQuoteItem4.wAmount = this.currentW.selling;
      this.formQuoteItem4.wDescription = this.currentW.description;
      this.formQuoteItem4.wExpense = this.currentW.trade;
      this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityW} x ${this.currentW.name}, ` 
      this.newQuotation.summary += `${this.formQuoteItem4.quantityW} x ${this.currentW.name}, `;
      this.newQuotation.amount += this.formQuoteItem4.quantityW * this.currentW.selling;
      this.newQuotation.profit += this.formQuoteItem4.quantityW * (this.currentW.selling - this.currentW.trade);
      this.newQuotation.expense += this.formQuoteItem4.quantityW * this.currentW.trade; 

      
      this.getProductByName(this.formQuoteItem4.flex)
            .then(flex => {
              this.currentFL = flex;
              this.formQuoteItem4.flAmount = this.currentFL.selling;
              this.formQuoteItem4.flDescription = this.currentFL.description;
              this.formQuoteItem4.flExpense = this.currentFL.trade;
              this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityFL} x ${this.currentFL.name}, ` 
              this.newQuotation.summary += `${this.formQuoteItem4.quantityFL} x ${this.currentFL.name}, `;
              this.newQuotation.amount += this.formQuoteItem4.quantityFL * this.currentFL.selling;
              this.newQuotation.profit += this.formQuoteItem4.quantityFL * (this.currentFL.selling - this.currentFL.trade);
              this.newQuotation.expense += this.formQuoteItem4.quantityFL * this.currentFL.trade; 
              
    
              this.getProductByName(this.formQuoteItem4.earth)
                .then(earth => {
                  if(earth.name != 'default'){
                    this.currentEa = earth;
                    this.formQuoteItem4.eAmount = this.currentEa.selling;
                    this.formQuoteItem4.eDescription = this.currentEa.description;
                    this.formQuoteItem4.eExpense = this.currentEa.trade;
                    this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityE} x ${this.currentEa.name}, ` 
                    this.newQuotation.summary += `${this.formQuoteItem4.quantityE} x ${this.currentEa.name}, `;
                    this.newQuotation.amount += this.formQuoteItem4.quantityE * this.currentEa.selling;
                    this.newQuotation.profit += this.formQuoteItem4.quantityE * (this.currentEa.selling - this.currentEa.trade);
                    this.newQuotation.expense += this.formQuoteItem4.quantityE * this.currentEa.trade;
    
                  }

                  this.getProductByName(this.formQuoteItem4.batt)
                    .then(batt => {
                      this.currentBatt = batt;
                      this.formQuoteItem4.bAmount = this.currentBatt.selling;
                      this.formQuoteItem4.bDescription = this.currentBatt.description;
                      this.formQuoteItem4.bExpense = this.currentBatt.trade;
                      this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityB} x ${this.currentBatt.name}, ` 
                      this.newQuotation.summary += `${this.formQuoteItem4.quantityB} x ${this.currentBatt.name}, `;
                      this.newQuotation.amount += this.formQuoteItem4.quantityB * this.currentBatt.selling;
                      this.newQuotation.profit += this.formQuoteItem4.quantityB * (this.currentBatt.selling - this.currentBatt.trade);
                      this.newQuotation.expense += this.formQuoteItem4.quantityB * this.currentBatt.trade;
                  
                      this.getProductByName(this.formQuoteItem4.weld)
                        .then(weld => {
                          if(weld.name != 'default')
                          {
                            this.currentWeld = weld;
                            this.formQuoteItem4.weAmount = this.currentWeld.selling;
                            this.formQuoteItem4.weDescription = this.currentWeld.description;
                            this.formQuoteItem4.weExpense = this.currentWeld.trade;
                            this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityWE} x ${this.currentWeld.name}, ` 
                            this.newQuotation.summary += `${this.formQuoteItem4.quantityWE} x ${this.currentWeld.name}, `;
                            this.newQuotation.amount += this.formQuoteItem4.quantityWE * this.currentWeld.selling;
                            this.newQuotation.profit += this.formQuoteItem4.quantityWE * (this.currentWeld.selling - this.currentWeld.trade);
                            this.newQuotation.expense += this.formQuoteItem4.quantityWE * this.currentWeld.trade;
                          }

                          this.getProductByName(this.formQuoteItem4.arm)
                            .then(arm => {
                              if(arm.name != 'default'){
                                this.currentArm = arm;
                                this.formQuoteItem4.aAmount = this.currentArm.selling;
                                this.formQuoteItem4.aDescription = this.currentArm.description;
                                this.formQuoteItem4.aExpense = this.currentArm.trade;
                                this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityA} x ${this.currentArm.name}, ` 
                                this.newQuotation.summary += `${this.formQuoteItem4.quantityA} x ${this.currentArm.name}, `;
                                this.newQuotation.amount += this.formQuoteItem4.quantityA * this.currentArm.selling;
                                this.newQuotation.profit += this.formQuoteItem4.quantityA * (this.currentArm.selling - this.currentArm.trade);
                                this.newQuotation.expense += this.formQuoteItem4.quantityA * this.currentArm.trade;  
                              }
                                                            
                              this.getProductByName(this.formQuoteItem4.trail)
                              .then(trail => {
                                if(trail.name != 'default'){
                                  this.currentTR = trail;
                                  this.formQuoteItem4.trAmount = this.currentTR.selling;
                                  this.formQuoteItem4.trDescription = this.currentTR.description;
                                  this.formQuoteItem4.trExpense = this.currentTR.trade;
                                  this.formQuoteItem4.summary += `${this.formQuoteItem4.quantityTR} x ${this.currentTR.name}, ` 
                                  this.newQuotation.summary += `${this.formQuoteItem4.quantityTR} x ${this.currentTR.name}, `;
                                  this.newQuotation.amount += this.formQuoteItem4.quantityTR * this.currentTR.selling;
                                  this.newQuotation.profit += this.formQuoteItem4.quantityTR * (this.currentTR.selling - this.currentTR.trade);
                                  this.newQuotation.expense += this.formQuoteItem4.quantityTR * this.currentTR.trade;

                                }
                                this.newQuotation.quoteItems.push({
                                  product: this.formQuoteItem4.pvwire,
                                  quantity: this.formQuoteItem4.quantityW,
                                  productAmount: this.formQuoteItem4.wAmount,
                                  productExpense: this.formQuoteItem4.wExpense,
                                  description: this.formQuoteItem4.wDescription,
                                  category: 'pvw'   
                                  });
                               
                                  if(this.formQuoteItem4.trail){
                                    this.newQuotation.quoteItems.push({
                                      product: this.formQuoteItem4.trail,
                                      quantity: this.formQuoteItem4.quantityTR,
                                      productAmount: this.formQuoteItem4.trAmount,
                                      productExpense: this.formQuoteItem4.trExpense,
                                      description: this.formQuoteItem4.trDescription,
                                      category: 'pvw'    
                                    });   
                                  }
                                  
                                  if(this.formQuoteItem4.earth)
                                  {
                                    this.newQuotation.quoteItems.push({
                                      product: this.formQuoteItem4.earth,
                                      quantity: this.formQuoteItem4.quantityE,
                                      productAmount: this.formQuoteItem4.eAmount,
                                      productExpense: this.formQuoteItem4.eExpense,
                                      description: this.formQuoteItem4.eDescription,
                                      category: 'pvw'
                                    });
                                  }
                                  
                                   
                                  this.newQuotation.quoteItems.push({
                                    product: this.formQuoteItem4.batt,
                                    quantity: this.formQuoteItem4.quantityB,
                                    productAmount: this.formQuoteItem4.bAmount,
                                    productExpense: this.formQuoteItem4.bExpense,
                                    description: this.formQuoteItem4.bDescription,
                                    category: 'pvw'
                                  });
                                  
                                  if(this.formQuoteItem4.weld)
                                  {
                                    this.newQuotation.quoteItems.push({
                                      product: this.formQuoteItem4.weld,
                                      quantity: this.formQuoteItem4.quantityWE,
                                      productAmount: this.formQuoteItem4.weAmount,
                                      productExpense: this.formQuoteItem4.weExpense,
                                      description: this.formQuoteItem4.weDescription,
                                      category: 'pvw'
                                    });
                                  }
                              
                                  this.newQuotation.quoteItems.push({
                                    product: this.formQuoteItem4.flex,
                                    quantity: this.formQuoteItem4.quantityFL,
                                    productAmount: this.formQuoteItem4.flAmount,
                                    productExpense: this.formQuoteItem4.flExpense,
                                    description: this.formQuoteItem4.flDescription,
                                    category: 'pvw'
                                   
                                  });
                                  if(this.formQuoteItem4.arm)
                                  {
                                    this.newQuotation.quoteItems.push({
                                      product: this.formQuoteItem4.arm,
                                      quantity: this.formQuoteItem4.quantityA,
                                      productAmount: this.formQuoteItem4.aAmount,
                                      productExpense: this.formQuoteItem4.aExpense,
                                      description: this.formQuoteItem4.aDescription,
                                      category: 'pvw'
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
                    });
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

    this.formQuoteItem4.pvwire = '';
    this.formQuoteItem4.quantityW = null;
    this.formQuoteItem4.wAmount = null;
    this.formQuoteItem4.wDescription = null;
    this.formQuoteItem4.wExpense = null;

    this.formQuoteItem4.trail = null;
    this.formQuoteItem4.quantityTR = null;
    this.formQuoteItem4.trAmount = null;
    this.formQuoteItem4.trDescription = null;
    this.formQuoteItem4.trExpense = null;

    this.formQuoteItem4.earth = null;
    this.formQuoteItem4.quantityE = null;
    this.formQuoteItem4.eAmount = null;
    this.formQuoteItem4.eDescription = null;
    this.formQuoteItem4.eExpense = null;

    this.formQuoteItem4.batt = null;
    this.formQuoteItem4.quantityB = null;
    this.formQuoteItem4.bAmount = null;
    this.formQuoteItem4.bDescription = null;
    this.formQuoteItem4.bExpense = null;

    this.formQuoteItem4.flex = null;
    this.formQuoteItem4.quantityFL = null;
    this.formQuoteItem4.flAmount = null;
    this.formQuoteItem4.flDescription = null;
    this.formQuoteItem4.flExpense = null;

    this.formQuoteItem4.weld = null;
    this.formQuoteItem4.quantityWE = null;
    this.formQuoteItem4.weAmount = null;
    this.formQuoteItem4.weDescription = null;
    this.formQuoteItem4.weExpense = null;

    this.formQuoteItem4.arm = null;
    this.formQuoteItem4.quantityA = null;
    this.formQuoteItem4.aAmount = null;
    this.formQuoteItem4.aDescription = null;
    this.formQuoteItem4.aExpense = null;

    this.formQuoteItem4.summary = null;

    this.currentW=null;
    this.currentTR = null;
    this.currentFL =null;
    this.currentEa = null;
    this.currentBatt = null;
    this.currentWeld = null;
    this.currentArm = null;

  
  }

  public getWires(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'wire') {
       
        this.wires.push(this.prods[i]);
      }
    }
  }
  public getTrails(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'wiretr') {
       
        this.trails.push(this.prods[i]);
      }
    }
  }
  public getFlexes(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'flex') {
       
        this.flexes.push(this.prods[i]);
      }
    }
  }
  public getEarths(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'earth') {
       
        this.earths.push(this.prods[i]);
      }
    }
  }
  public getBatts(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'batt') {
       
        this.batts.push(this.prods[i]);
      }
    }
  }
  public getWelds(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'weld') {
       
        this.welds.push(this.prods[i]);
      }
    }
  }
  public getArms(cat: string) : void {
    for(let i = 0; i < this.prods.length; i++){
      if(this.prods[i].subCategory == 'pvc') {
       
        this.arms.push(this.prods[i]);
      }
    }
  }

  

  

  ngOnInit() {
    this.getWires('wire');
    this.getTrails('cons');
    this.getFlexes('acprot');
    this.getBatts('chover');
    this.getWelds('mcb');
    this.getEarths('surgprot');
    this.getArms('avr');
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }




}
