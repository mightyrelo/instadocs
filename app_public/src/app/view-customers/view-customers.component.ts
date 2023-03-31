import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Our Customers',
      strapline: ''
    },
    viewBar: {
      main: 'Customers served by our business',
      sub: 'If the customer is always right, what will you win if you cause a fight?'  
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
