import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Products - ',
      strapline: 'Items available for sale'

    },
    viewBar: {
      main: '',
      sub: ''
    }
  };



  constructor() { }

  ngOnInit() {
  }

}
