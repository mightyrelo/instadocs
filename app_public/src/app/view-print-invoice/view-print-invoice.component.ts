import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import * as html2pdf from 'html2pdf.js';


import { CompanyDataService } from '../company-data.service';
import { CustomerDataService } from '../customer-data.service';
import { InvoiceDataService } from '../invoice-data.service';
import { Company } from '../company';
import { Customer, Invoice } from '../customer';

import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-view-print-invoice',
  templateUrl: './view-print-invoice.component.html',
  styleUrls: ['./view-print-invoice.component.css']
})
export class ViewPrintInvoiceComponent implements OnInit {

  

  public company : Company;
  public customer : Customer;
  public invoice: Invoice;

  public foundId : string;

  public companies : Company[];

  public userName : string;
  
  constructor(
    private companyDataService : CompanyDataService,
    private invoiceDataService: InvoiceDataService,
    private customerDataService: CustomerDataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService

  ) { }

  private getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
      this.userName = name;
     return name ? name : 'Guest'
    }
    return 'Guest';
    
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

 

  private getCompany() : void {
    this.companyDataService.readCompanies()
    .then(response => {
      this.companies = response;
      for(let i = 0; i < this.companies.length; i++)
      {
        
        if(this.companies[i].userId == this.getUserName())
        {
          this.companyDataService.readCompany(this.companies[i]._id)
           .then(resp => {this.company = resp; console.log(this.company)});
        }        
      }
    });
  }

  public createPDF() : void {
    const options = {
      filename: `${this.customer.name}I.pdf`,
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };
    const content: Element = document.getElementById('print');
    
    html2pdf()
      .from(content)
      .set(options)
      .save();
  }


 
  ngOnInit() : void {
 
      this.getCompany();
      console.log('company', this.company);
      this.route.paramMap
      .pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('customerId');
        this.foundId = id;
        return this.customerDataService.getCustomer(id);
      })
      )
      .subscribe((newCustomer: Customer) => {
        console.log('customer', this.customer);
        this.customer = newCustomer;
        this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            let iId = params.get('invoiceId');
            return this.invoiceDataService.readInvoice(this.foundId, iId);
          })
        )
        .subscribe((inv: Invoice) => {         
          this.invoice = inv;
          console.log('inv', this.invoice);
        })
      })
  }


}
