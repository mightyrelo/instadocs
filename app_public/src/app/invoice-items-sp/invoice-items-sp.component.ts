import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../customer';

@Component({
  selector: 'app-invoice-items-sp',
  templateUrl: './invoice-items-sp.component.html',
  styleUrls: ['./invoice-items-sp.component.css']
})
export class InvoiceItemsSpComponent implements OnInit {

  @Input() invoice : Invoice;

  public pvInvoice : Invoice = new Invoice();
  public pvwInvoice : Invoice = new Invoice();
  public acInvoice : Invoice = new Invoice();
  public battInvoice : Invoice = new Invoice();
  public otInvoice : Invoice = new Invoice();
  public protInvoice : Invoice = new Invoice();
  public cabInvoice : Invoice = new Invoice();


  public revealPV : boolean = false;
  public revealPVW : boolean = false;
  public revealAC : boolean = false;
  public revealBATT : boolean = false;
  public revealOT : boolean = false;
  public revealProt : boolean = false;
  public revealCab : boolean = false;

  constructor() { }

  private splitMainIntoSubInvoices() : void {
    
    for(let i = 0; i < this.invoice.invoiceItems.length; i++){

      if(this.invoice.invoiceItems[i].category == 'pv')
      {
          
          this.pvInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.pvInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.pvInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.pvInvoice.profit += this.invoice.invoiceItems[i].quantity*(this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense);
      }
      else if(this.invoice.invoiceItems[i].category == 'ac')
      {
          this.acInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.acInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.acInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.acInvoice.profit += (this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense)*this.invoice.invoiceItems[i].quantity;
      }
      else if(this.invoice.invoiceItems[i].category == 'pvw')
      {
          this.pvwInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.pvwInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.pvwInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.pvwInvoice.profit += (this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense)*this.invoice.invoiceItems[i].quantity;
      }
      if(this.invoice.invoiceItems[i].category == 'batt')
      {
          this.battInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.battInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.battInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.battInvoice.profit += (this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense)*this.invoice.invoiceItems[i].quantity;
      }
      if(this.invoice.invoiceItems[i].category == 'ot')
      {
          this.otInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.otInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.otInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.otInvoice.profit += (this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense)**this.invoice.invoiceItems[i].quantity;
      }
      if(this.invoice.invoiceItems[i].category == 'prot')
      {
          this.protInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.protInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.protInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.protInvoice.profit += (this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense)**this.invoice.invoiceItems[i].quantity;
      }
      if(this.invoice.invoiceItems[i].category == 'cab')
      {
          this.cabInvoice.invoiceItems.push(this.invoice.invoiceItems[i]);
          this.cabInvoice.amount += this.invoice.invoiceItems[i].productAmount*this.invoice.invoiceItems[i].quantity;
          this.cabInvoice.expense += this.invoice.invoiceItems[i].productExpense*this.invoice.invoiceItems[i].quantity;
          this.cabInvoice.profit += (this.invoice.invoiceItems[i].productAmount - this.invoice.invoiceItems[i].productExpense)**this.invoice.invoiceItems[i].quantity;
      }
    }
    this.pvInvoice.summary = 'PV SETUP';
    this.acInvoice.summary = 'AC';
    this.pvwInvoice.summary = 'PV CABLING';
    this.battInvoice.summary = 'BATTERY';
    this.otInvoice.summary = 'ADDITIONAL';
    this.protInvoice.summary = 'PV SAFETY';
    this.cabInvoice.summary = 'CABLEWAY';
  }

  ngOnInit() : void{
    this.pvInvoice.invoiceItems = [];
    this.pvwInvoice.invoiceItems = [];
    this.acInvoice.invoiceItems = [];
    this.battInvoice.invoiceItems = [];
    this.otInvoice.invoiceItems = [];
    this.protInvoice.invoiceItems = [];
    this.cabInvoice.invoiceItems = [];
    this.pvInvoice.amount = 0;
    this.acInvoice.amount = 0;
    this.pvwInvoice.amount = 0;
    this.battInvoice.amount = 0;
    this.otInvoice.amount = 0;
    this.protInvoice.amount = 0;
    this.cabInvoice.amount = 0;
    this.splitMainIntoSubInvoices();
  }

}
