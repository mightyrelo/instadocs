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
  public formCat2 = {
    subCategory: ''
  };
  public categories = ['user','suv','intr','int','acc','efe','aut','autt','auto','pow','cab','swt','tool','fir'];
  public categoriesFull = ['user','surveillance','intruder detection','intercoms','access control','electric fencing','gate automation','garage-door automation','advanced automation','power supplies','cabling','switches','tools','fire equipment'];

  public efeSubCategories = ['ENG','POLE','WIRE','INSULATOR','ACCESS','WARNING','PROTECTION','TOOL','LIGHT','CABLE','FREE','SOLAR'];
  public efeSubCategoriesFull = ['energizer','pole','fence wire','insulator','accessories','warning signs','lightning protection','tools','fence lights','HT cable','Free-standing','solar'];

  public subCategories = [];
  public subCategoriesFull = [];

  public suvSubCategories = ['kit','cam','dvr','nvr','cam_ip','license','kit_ip','int','acc','intr','swt','wireless','pc','monitor','hdd','store', 'cabinet', 'cable', 'access', 'connect', 'tool', 'power', 'protection'];
  public suvSubCategoriesFull = ['full kit','cameras','dvr','nvr','ip cameras','licenses','full ip kit','video intercom','access control','intruder detection','switches','wireless accessories', 'surveillance pc', 'monitor', 'hard-drive', 'storage', 'cabinets', 'accessories', 'connectors', 'tools', 'power supply', 'lightning protection'];

  public autSubCategories = ['cent_kit_sl', 'cent_kit_sw', 'cent_kit_gd', 'cage', 'board', 'cent_acc', 'cent_char',
                            'nice_kit', 'nice_acc', 'gemini', 'dace', 'hansa', 'sentry',
                            'beam', 'detector', 'wheel', 'rack','swt', 'remote', 'receiver','gate_solar',
                          ];
  public autSubCategoriesFull = ['centurion - sliding gate kit', 'centurion - swing gate kit',
                            'centurion - garage door kit', 'centurion - anti-theft',
                            'PC Board', 'centurion - accessories', 'centurion - charger',
                            'nice kit', 'nice - accessories', 'gemini - kit', 'dace - kit', 'hansa - kit',
                            'sentry - kit', 'safety beam', 'loop detector', 'gate wheels','rack',
                            'switches','transmitters','receivers', 'gate - solar accessories'
                          ];

  public intrSubCategories = ['ajax','lightsys','risco','ids','optex', 'dsc', 'securiprod', 'crow'
                              ,'paradox' ,'takex','robo','al_acc', 'al_lights', 'al_sw','mag_contact'
                              ,'al_remote', 'pepper' ];

  public intrSubCategoriesFull = ['ajax','lightsys','risco','ids','optex', 'dsc', 'securiprod', 'crow'
                              ,'paradox' ,'takex','robo','alarm accesssories', 'alarm lights', 
                              'alarm switches','magnetic contacts'
                              ,'alarm remote', 'pepper spray' ];

  public accSubCategories = ['zk_fp', 'zk_enrol_fp', 'zk_prox', 'zk_tag', 'zk_uhf', 'zk_cont',
                            'zk_kit','zk_xray', 'zk_multi', 'zk_soft', 'zk_detect', 'zk_boom',
                             'turn', 'barrier', 'vi_reader', 'vi_acc', 'mor_reader', 'mor_shield',
                            'mor_acc'];
                            
  public accSubCategoriesFull = ['zk fingerprint', 'zk fingerprint enrolment', 
                                'zk proximity', 'zk tags', 'zk uhf', 'zk controllers',
                            'zk full-kit','zk xray', 'zk multimodal', 'zk software',
                             'zk detectors', 'zk boom gates',
                             'turnstiles', 'traffic barrier', 'virdi readers', 
                             'virdi accessories', 'morpho readers', 'morpho shield',
                            'morpho accessories'];

  public intSubCategories = ['int_kit', 'station', 'handset', 'bpt_acc', 'vid_handset'
                            ,'vid_kit', 'vid_station', 'vid_mon', 'sch_int', 'int_swt'
                            , 'int_nowire', 'int_acc', 'gsm'];

  public intSubCategoriesFull = ['audio intercom kits', 'gate stations', 'handsets', 'bpt accessories',
                                 'video handsets','video kits', 'video stations',
                                'video monitor', 'school intercoms', 'intercom  switches'
                                ,'wireless intercoms', 'intercom accessories', 'gsm units'];
  
  public auttSubCategories = ['cent_gdo', 'cent_belt', 'cent_sm', 'rdo', 'dc', 'gemini_gdo', 'digi'];                              
  public auttSubCategoriesFull = ['centurion door operator', 'centurion belt-drives', 'centurion smart operators', 'rollup door operators', 'dc blue operators', 'gemini door openers', 'digidoor operators'];                              

  public autoSubCategories = ['nice_barrier', 'nice_spike', 'loop_detector', 'cent_barrier', 'cent_spike', 'cent_barrier_acc'];
  public autoSubCategoriesFull = ['nice traffic barrier', 'nice spikes', 'loop detectors', 'centurion traffic barriers', 'centurion spikes', 'centurion traffic accessories'];

  public cabSubCategories = ['ripcord', 'comms', 'stranded', 'cabtyre', 'twinE',
                              'mylar', 'fire', 'trunking', 'tie', 'pvc', 'cab_enc', 'cab_sol'];
                          
  public cabSubCategoriesFull = ['ripcord', 'comms cable', 'stranded comms cable', 'cabtyre', 'twin and earth',
                              'mylar', 'fire cable', 'trunking', 'cable tie', 'pvc and accessories', 'cable enclosures'
                              ,'solar cables'];
  
  public powSubCategories = ['battt', 'lit_batt', 'batt_small', 'batt_enc', 'pow_sup'
                            ,'sol_pow'];
                          
  public powSubCategoriesFull = ['batteries', 'lithium batteries', 'small batteries', 'battery enclosures', 'power supplies'
                            ,'solar power'];

  public swtSubCategories = ['relay', 'timer', 'pb', 'e_sw', 'key_sw'];
  public swtSubCategoriesFull = ['relays', 'timer switches', 'push buttons', 
                                'emergency switches', 'key switches'];
  
  public toolSubCategories = ['power', 'torch', 'multi', 'hardware', 'other_tool'];
  public toolSubCategoriesFull = ['power tools', 'torches', 'multimeters', 'hardware', 'others'];

  public fireSubCategories = ['panel', 'supply_fire', 'callpoints', 'detect_fire',
                              'fire_sound'];
                          
  public fireSubCategoriesFull = ['control panel', 'fire power supply', 'call points', 'smoke detectors',
                              'sound equipment'];

  public userSubCategories = ['labour', 'travelling', 'assessment', 'callout', 'user'];
  public userSubCategoriesFull = ['labour', 'travelling', 'assessment', 'callout', 'user products'];
                          
  public categorySelected = false;
  public subCategorySelected = false;

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
    if(this.categories[idx] == 'suv'){
      this.subCategoriesFull = this.suvSubCategoriesFull;
      this.subCategories = this.suvSubCategories;
    }
    else if(this.categories[idx] == 'efe'){
      
      this.subCategoriesFull = this.efeSubCategoriesFull;
      this.subCategories = this.efeSubCategories;
    }
    else if(this.categories[idx] == 'aut'){
      
      this.subCategoriesFull = this.autSubCategoriesFull;
      this.subCategories = this.autSubCategories;
    }
    else if(this.categories[idx] == 'intr'){
      
      this.subCategoriesFull = this.intrSubCategoriesFull;
      this.subCategories = this.intrSubCategories;
    }
    else if(this.categories[idx] == 'acc'){
      
      this.subCategoriesFull = this.accSubCategoriesFull;
      this.subCategories = this.accSubCategories;
    }
    else if(this.categories[idx] == 'int'){
      
      this.subCategoriesFull = this.intSubCategoriesFull;
      this.subCategories = this.intSubCategories;
    }

    else if(this.categories[idx] == 'autt'){
      
      this.subCategoriesFull = this.auttSubCategoriesFull;
      this.subCategories = this.auttSubCategories;
    }

    else if(this.categories[idx] == 'auto'){
      
      this.subCategoriesFull = this.autoSubCategoriesFull;
      this.subCategories = this.autoSubCategories;
    }
    else if(this.categories[idx] == 'cab'){
      
      this.subCategoriesFull = this.cabSubCategoriesFull;
      this.subCategories = this.cabSubCategories;
    }
    else if(this.categories[idx] == 'pow'){
      
      this.subCategoriesFull = this.powSubCategoriesFull;
      this.subCategories = this.powSubCategories;
    }
    else if(this.categories[idx] == 'swt'){
      
      this.subCategoriesFull = this.swtSubCategoriesFull;
      this.subCategories = this.swtSubCategories;
    }
    else if(this.categories[idx] == 'tool'){
      
      this.subCategoriesFull = this.toolSubCategoriesFull;
      this.subCategories = this.toolSubCategories;
    }

    else if(this.categories[idx] == 'fir'){
      
      this.subCategoriesFull = this.fireSubCategoriesFull;
      this.subCategories = this.fireSubCategories;
    }

    else if(this.categories[idx] == 'user'){
      this.subCategoriesFull = this.userSubCategoriesFull;
      this.subCategories = this.userSubCategories;
    }

    this.categorySelected = true;
  }

  public onSubCategorySubmit() : void {
    const idx = this.subCategoriesFull.indexOf(this.formCat2.subCategory); 
    this.productDataService.getSubCategoryProducts(this.getUserName(), this.subCategories[idx])
      .then(foundProducts => {
        console.log(foundProducts.length);
        this.products = foundProducts;
        this.subCategorySelected = true;
      })
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
      console.log('deep', this.newQuotation.amount)
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
      this.formError = 'No itemss entered, please try again.';
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

  public categoryChanged(event: any) : void {
    console.log('cat changed', event.target.value);
    const idx = this.categoriesFull.indexOf(event.target.value);
    if(this.categories[idx] == 'suv'){
      this.subCategoriesFull = this.suvSubCategoriesFull;
      this.subCategories = this.suvSubCategories;
    }
    else if(this.categories[idx] == 'efe'){
      
      this.subCategoriesFull = this.efeSubCategoriesFull;
      this.subCategories = this.efeSubCategories;
    }
    else if(this.categories[idx] == 'aut'){
      
      this.subCategoriesFull = this.autSubCategoriesFull;
      this.subCategories = this.autSubCategories;
    }
    else if(this.categories[idx] == 'intr'){
      
      this.subCategoriesFull = this.intrSubCategoriesFull;
      this.subCategories = this.intrSubCategories;
    }
    else if(this.categories[idx] == 'acc'){
      
      this.subCategoriesFull = this.accSubCategoriesFull;
      this.subCategories = this.accSubCategories;
    }
    else if(this.categories[idx] == 'int'){
      
      this.subCategoriesFull = this.intSubCategoriesFull;
      this.subCategories = this.intSubCategories;
    }

    else if(this.categories[idx] == 'autt'){
      
      this.subCategoriesFull = this.auttSubCategoriesFull;
      this.subCategories = this.auttSubCategories;
    }

    else if(this.categories[idx] == 'auto'){
      
      this.subCategoriesFull = this.autoSubCategoriesFull;
      this.subCategories = this.autoSubCategories;
    }
    else if(this.categories[idx] == 'cab'){
      
      this.subCategoriesFull = this.cabSubCategoriesFull;
      this.subCategories = this.cabSubCategories;
    }
    else if(this.categories[idx] == 'pow'){
      
      this.subCategoriesFull = this.powSubCategoriesFull;
      this.subCategories = this.powSubCategories;
    }
    else if(this.categories[idx] == 'swt'){
      
      this.subCategoriesFull = this.swtSubCategoriesFull;
      this.subCategories = this.swtSubCategories;
    }
    else if(this.categories[idx] == 'tool'){
      
      this.subCategoriesFull = this.toolSubCategoriesFull;
      this.subCategories = this.toolSubCategories;
    }

    else if(this.categories[idx] == 'fir'){
      
      this.subCategoriesFull = this.fireSubCategoriesFull;
      this.subCategories = this.fireSubCategories;
    }

    else if(this.categories[idx] == 'user'){
      this.subCategoriesFull = this.userSubCategoriesFull;
      this.subCategories = this.userSubCategories;
    }

    this.categorySelected = true;
    this.formCat2.subCategory = this.subCategoriesFull[0];
    this.productDataService.getSubCategoryProducts(this.getUserName(), this.subCategories[0])
      .then(foundSubProducts => {
        this.products = foundSubProducts;
        this.subCategorySelected = true;
      })

  }

  public subCategoryChanged(event: any) : void {
    console.log('subcat changed', event.target.value);
    const idx = this.subCategoriesFull.indexOf(event.target.value); 
    this.productDataService.getSubCategoryProducts(this.getUserName(), this.subCategories[idx])
      .then(foundProducts => {
        console.log(foundProducts.length);
        this.products = foundProducts;
        this.subCategorySelected = true;
      })
  }

  ngOnInit() : void {
    for(let i = 1; i <= 100;i++){
      this.counts[i] = i;
    }
  }

}
