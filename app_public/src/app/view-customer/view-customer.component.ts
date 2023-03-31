import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  public newCustomer : Customer;

  constructor(
    private customerDataService : CustomerDataService,
    private route: ActivatedRoute
  ) { }



  public pageContent = {
    header: {
      title:'',
      strapline: ''
    },
    viewBar: {
      main: ``,
      sub: ``  
    }
  };

  ngOnInit() : void {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
       let id = params.get('customerId');
       return this.customerDataService.getCustomer(id);
      })
    )
    .subscribe((newCustomer: Customer) => {
     this.newCustomer = newCustomer;
     this.pageContent.header.title = newCustomer.name.toString();
     this.pageContent.viewBar.main = `${this.newCustomer.name} is on Ngamla because they enquired about our services.`
     this.pageContent.viewBar.sub = `Nugget: The aim is to convert ${this.newCustomer.name}'s query into an actual sale. The first step is to prepare a professional-looking quotation based on their request. Click on the Quote button to continue...`
    });
  }

}
