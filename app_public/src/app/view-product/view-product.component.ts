import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';


import { Product } from '../product';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  public newProduct : Product;

  constructor(
    private prodDataService : ProductDataService,
    private route : ActivatedRoute) { }

  public pageContent = {
    header: {
      title:'',
      strapline: ''
    },
    viewBar: {
      main: ``,
      sub: ``  
    }
  }

  ngOnInit() : void {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
       let id = params.get('productId');
       return this.prodDataService.getProduct(id);
      })
    )
    .subscribe((newProduct: Product) => {
     this.newProduct = newProduct;
     this.pageContent.header.title = newProduct.name.toString();
     this.pageContent.viewBar.main = `${this.newProduct.name} is currently avaiable.`
     this.pageContent.viewBar.sub = `Nugget: The aim is to use ${this.newProduct.name} when rendering services.`
    });

  }



}
