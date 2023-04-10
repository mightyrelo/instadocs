import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import * as html2pdf from 'html2pdf.js';

import { CompanyDataService } from '../company-data.service';
import { CustomerDataService } from '../customer-data.service';
import { Company } from '../company';
import { Customer, Invoice } from '../customer';
import { InvoiceDataService } from '../invoice-data.service';
import { AuthenticationService } from '../authentication.service';

import { UserDataService } from '../user-data.service';
import { User } from '../user';



@Component({
  selector: 'app-view-print-po',
  templateUrl: './view-print-po.component.html',
  styleUrls: ['./view-print-po.component.css']
})
export class ViewPrintPoComponent implements OnInit {

  public company : Company;
  public customer : Customer;
  public invoice: Invoice;
  public companies : Company[];

  public foundId : string;

  public userName : string;
  public user : User;
  
  constructor(
    private companyDataService : CompanyDataService,
    private invoiceDataService: InvoiceDataService,
    private customerDataService: CustomerDataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userDataService: UserDataService

  ) { }

  public printQuote(cusId: string, qId: string) : void {
    this.getCompany();
    this.getCustomer(cusId);
    this.getQuote(cusId, qId);
  }

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
    //this.companyDataService.readCompany('63563a51f2aebf78da7348a7')//  63ad639ce44e1cd8465b1858
    this.companyDataService.readCompanies()
    .then(response => {
      this.companies = response;
      for(let i = 0; i < this.companies.length; i++)
      {
        
        if(this.companies[i].userId == this.getUserName())
        {
          this.companyDataService.readCompany(this.companies[i]._id)
           .then(resp => {
              this.company = resp;
              this.userDataService.getUserByName(this.getUserName())
               .then(user => {
                this.user = user;
              });
            });
        }        
      }
    });
  }

  private getCustomer(id: string) : void {
    this.customerDataService.getCustomer(id)
      .then(resp => {this.customer = resp; console.log(this.customer)});
  }

  private getQuote(cusId: string, qId: string) : void {
    this.invoiceDataService.readInvoice(cusId, qId)
      .then(rsp => {this.invoice = rsp;});
  }

  public createPDF() : void {
    const options = {
      filename: `${this.customer.name}P.pdf`,
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
      this.route.paramMap
      .pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('customerId');
        this.foundId = id;
        return this.customerDataService.getCustomer(id);
      })
      )
      .subscribe((newCustomer: Customer) => {
        this.customer = newCustomer;
        this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            let invId = params.get('invoiceId');
            return this.invoiceDataService.readInvoice(this.foundId, invId);
          })
        )
        .subscribe((inv: Invoice) => {  
          console.log(inv);       
          this.invoice = inv;
          this.userDataService.getUserByName(this.getUserName())
            .then(response => {
              response.completedPOs = response.completedPOs + 1;
              this.userDataService.updateInvoices(response)
                .then(usr => {
                    console.log('completed POs', usr.completedPOs);
                });
            });
        })
      })
  }

}
