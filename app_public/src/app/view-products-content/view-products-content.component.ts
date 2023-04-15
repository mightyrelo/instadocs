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

  public categories = ['user','suv','aut','intr','pow','cab','tool','int','acc','fir','swt','efe', 'auto'];
  public categoriesFull = ['user','surveillance','automation','intrusion','power','cabling','tools','intercom','access control','fire','switches','electric fencing', 'automation advanced'];

  public solarCategories = ['user','PV','PVCABLE','PVPROT','AC','ACCABLE', 'battery','TRVLAB'];
  public solarCategoriesFull = ['user', 'pv setup', 'pv cabling', 'pv protection', 'ac', 'ac cableway', 'battery', 'additional'];

  public solarPVSubCategories = ['panel','roof','other','inv'];
  public solarPVSubCategoriesFull = ['panels','roof types','other','inverters'];
  public solarPVCabSubCategories = ['wire','wiretr','earth','flex','batt','weld','pvc'];
  public solarPVCabSubCategoriesFull = ['PV wire','wire trunking','earth cable','flex cable','battery cable','welding cable','armour'];
  public solarACSubCategories = ['din','cons','chover','mcb','surgProt','avr'];
  public solarACSubCategoriesFull = ['din-rail','consumables','change over switch','main circuit breaker','surge Protection','avr switch'];
  public solarPVProtSubCategories = ['acprot'];
  public solarPVProtSubCategoriesFull = ['ac protection'];
  public solarCabSubCategories = ['cab'];
  public solarCabSubCategoriesFull = ['ac cableway'];
  public solarBatSubCategories = ['batt','batprot','batstand'];
  public solarBatSubCategoriesFull = ['battery','batttery protection','battery stand'];
  public solarOtherSubCategories = ['trvl','lab', 'assess'];
  public solarOtherSubCategoriesFull = ['travelling','labour', 'assessment'];

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
    this.productDataService.addProduct(this.newProduct)
      .then((prod: Product) => {
        console.log('product saved', prod.category);
        this.resetAndHideProductForm();
      });
  }

  public addSubCatProducts(cat: Product[]) : void {
    
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
      this.productDataService.getCategoryProducts(this.getUserName(), this.categories[idx])
        .then(foundProducts => {
          this.products = foundProducts;
          console.log(this.products.length);
          //write the correct subproducts into cat
        });
    }
  }

  public onSubCategorySubmit() : void {
    const idx = this.solarSubCategoriesFull.indexOf(this.formCat2.subCategory);
    this.productDataService.getSubCategoryProducts(this.getUserName(), this.solarSubCategories[idx])
    .then(foundSubProducts => {
      this.subProducts = foundSubProducts;
      this.products = foundSubProducts;
    })
  }

  private getProducts() : void {
    this.productDataService
      .getProducts(this.getUserName())
      .then(foundProducts => this.products = foundProducts)
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
