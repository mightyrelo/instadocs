import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-products-content',
  templateUrl: './view-products-content.component.html',
  styleUrls: ['./view-products-content.component.css']
})
export class ViewProductsContentComponent implements OnInit {

 
  //variableName: variableType = variableValue
  public products: Product[];
  public subProducts: Product[];

  public displayForm = false;
  public formError = '';
  public formError2 = '';


  public categories = ['user','suv','intr','int','acc','efe','aut','autt','auto','pow','cab','swt','tool','fir'];
  public categoriesFull = ['user','surveillance','intruder detection','intercoms','access control','electric fencing','gate automation','garage-door automation','advanced automation','power supplies','cabling','switches','tools','fire equipment'];


  public solarCategories = ['user','PV','PVCABLE','PVPROT','AC','ACCABLE', 'battery','TRVLAB'];
  public solarCategoriesFull = ['user', 'pv setup', 'pv cabling', 'pv protection', 'ac', 'ac cableway', 'battery', 'additional'];

  public solarPVSubCategories = ['panel','roof','other','inv'];
  public solarPVSubCategoriesFull = ['panels','roof types','other','inverters'];

  public solarPVCabSubCategories = ['wire','wiretr','earth','flex','batt','weld','pvc'];
  public solarPVCabSubCategoriesFull = ['PV wire','wire trunking','earth cable','flex cable','battery cable','welding cable','armour'];
  
  public solarACSubCategories = ['din','cons','chover','mcb','surgprot','avr'];
  public solarACSubCategoriesFull = ['din-rail','consumables','change over switch','main circuit breaker','surge Protection','avr switch'];
  
  public solarPVProtSubCategories = ['psm','fuse','box'];
  public solarPVProtSubCategoriesFull = ['Psm', 'fuses', 'boxes'];
  
  public solarCabSubCategories = ['cab'];
  public solarCabSubCategoriesFull = ['ac cableway'];
  
  public solarBatSubCategories = ['batt','batprot','batstand'];
  public solarBatSubCategoriesFull = ['battery','batttery protection','battery stand'];
  
  public solarOtherSubCategories = ['trvl','lab', 'assess'];
  public solarOtherSubCategoriesFull = ['travelling','labour', 'assessment'];

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
                              'mylar', 'fire cable', 'trunking', 'cable ties', 'pvc and accessories', 'cable enclosures'
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


  public solarSubCategoriesFull = [];
  public solarSubCategories = [];

  public formCat = {
    category: '',
  }; 

  public formCat2 = {
    subCategory: '',
  }; 

  public products2 : Product[];

  public categorySubmitted : boolean = false;

  public newProduct : Product = {
    _id: '',
    name: '',
    description: '',
    retail: null,
    trade: null,
    selling: null,
    flagged: false,
    userId: '',
    category: '',
    subCategory: ''
  };

  constructor(private productDataService: ProductDataService,
    private auth : AuthenticationService) { }

  private formIsValid(): boolean {
    if(this.newProduct.name && this.newProduct.description && this.newProduct.trade && this.newProduct.selling) {
      return true;
    } else {
      return false;
    }
  }

  public resetAndHideProductForm() : void {
    this.formError = '';
    this.newProduct.name = '';
    this.newProduct.description = '';
    this.newProduct.retail = null;
    this.newProduct.trade = null;
    this.newProduct.selling = null;
    this.displayForm = false;
    this.newProduct.category = '';
    this.getProducts();
  }

  //deleting quote
  flagged(prodId: string) {
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i]._id == prodId){
        this.products[i].flagged = true;
      }
    }
  }

  isFlagged(prodId: string) {
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i]._id == prodId){
        if(this.products[i].flagged){
          return true;
        } else return false;

      }
    }
  }

  setFlagOff(prodId: string) {
    for(let i = 0; i < this.products.length; i++) {
      if(this.products[i]._id === prodId) {
        this.products[i].flagged = false;
      }
    }
  }

  deleteProduct(prodId: string) {
    this.productDataService.deleteProduct(prodId)
      .then(response => {if(!response){console.log('deleted');this.getProducts()}});
  }


  private doAddProduct() : void {

    if(this.getUserName() != 'thabethe'){
      const idx = this.categoriesFull.indexOf(this.formCat.category);
      const idx2 = this.subCategoriesFull.indexOf(this.formCat2.subCategory);
      this.newProduct.category = this.categories[idx];
      this.newProduct.subCategory = this.subCategories[idx2];
      this.productDataService.addProduct(this.newProduct)
      .then((prod: Product) => {
        console.log('product saved', prod.category);
        this.resetAndHideProductForm();
      });  
    }
    else{
      const idx = this.solarCategoriesFull.indexOf(this.formCat.category);
      const idx2 = this.solarSubCategoriesFull.indexOf(this.formCat2.subCategory);
      this.newProduct.category = this.solarCategories[idx];
      this.newProduct.subCategory = this.solarSubCategories[idx2];
      this.productDataService.addProduct(this.newProduct)
      .then((prod: Product) => {
        console.log('product saved', prod.category, prod.subCategory);
        this.resetAndHideProductForm();
      });
    }
    
  }

  public onProductSubmit() : void {
    this.formError = '';
    this.newProduct.userId = this.getUserName();
    if(this.formIsValid()) {
      //get last item and set its summary
      this.doAddProduct();
    } else {
      this.formError = 'product details missing, please try again.';
    }
  }
  public onCategorySubmit() : void {
    //this.formError2 = '';
    
    if(this.getUserName() == 'thabethe'){
      const idx = this.solarCategoriesFull.indexOf(this.formCat.category);
      this.productDataService.getCategoryProducts(this.getUserName(), this.solarCategories[idx])
        .then(foundProducts => {
          this.products2 = foundProducts;
          this.categorySubmitted = true;
          if(this.products2[0].category == 'PV'){
            this.solarSubCategoriesFull = this.solarPVSubCategoriesFull;
            this.solarSubCategories = this.solarPVSubCategories;
          }
          if(this.products2[0].category == 'PVCABLE'){
            this.solarSubCategoriesFull = this.solarPVCabSubCategoriesFull;
            this.solarSubCategories = this.solarPVCabSubCategories;
          }
          if(this.products2[0].category == 'PVPROT'){
            this.solarSubCategoriesFull = this.solarPVProtSubCategoriesFull;
            this.solarSubCategories = this.solarPVProtSubCategories;
          }
          if(this.products2[0].category == 'AC'){
            this.solarSubCategoriesFull = this.solarACSubCategoriesFull;
            this.solarSubCategories = this.solarACSubCategories;
          }
          if(this.products2[0].category == 'ACCABLE'){
            this.solarSubCategoriesFull = this.solarCabSubCategoriesFull;
            this.solarSubCategories = this.solarCabSubCategories;
          }
          if(this.products2[0].category == 'battery'){
            this.solarSubCategoriesFull = this.solarBatSubCategoriesFull;
            this.solarSubCategories = this.solarBatSubCategories;
          }
          if(this.products2[0].category == 'TRVLAB'){
            this.solarSubCategoriesFull = this.solarOtherSubCategoriesFull;
            this.solarSubCategories = this.solarOtherSubCategories;
          }
        });
    }
    else {
      
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

    this.categorySubmitted = true;

   
    }
  }

  public onSubCategorySubmit() : void {

    if(this.getUserName() == 'thabethe'){
      const idx = this.solarSubCategoriesFull.indexOf(this.formCat2.subCategory);
      this.productDataService.getSubCategoryProducts(this.getUserName(), this.solarSubCategories[idx])
      .then(foundSubProducts => {
        this.subProducts = foundSubProducts;
        console.log('length of found', foundSubProducts.length);
        this.products = foundSubProducts;
      })
    }
    else {
      const idx = this.subCategoriesFull.indexOf(this.formCat2.subCategory);
      this.productDataService.getSubCategoryProducts(this.getUserName(), this.subCategories[idx])
      .then(foundSubProducts => {
        this.subProducts = foundSubProducts;
        console.log('length of found', foundSubProducts.length);
        this.products = foundSubProducts;
      })
    }
  }

  private getProducts() : void {
    if(this.getUserName() != 'thabethe'){
      const idx = this.subCategoriesFull.indexOf(this.formCat2.subCategory);
      this.productDataService
      .getSubCategoryProducts(this.getUserName(), this.subCategories[idx])
      .then(foundProducts => this.products = foundProducts)
    }
    else{
      const idx = this.solarSubCategoriesFull.indexOf(this.formCat2.subCategory);
      this.productDataService
      .getSubCategoryProducts(this.getUserName(), this.solarSubCategories[idx])
      .then(dbProducts => this.products = dbProducts);
    }
  }

  public isLoggedIn() : boolean {
    return this.auth.isLoggedIn();
  }


  public getUserName() : string
  {
    if(this.isLoggedIn())
    {
      const {name} = this.auth.getCurrentUser();
      return name ? name : 'Guest'
    }
    return 'Guest';
  }

  ngOnInit() {
    //this.getProducts();
  }

}
