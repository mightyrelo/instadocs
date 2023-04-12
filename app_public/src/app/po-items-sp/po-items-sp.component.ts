import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../customer';

@Component({
  selector: 'app-po-items-sp',
  templateUrl: './po-items-sp.component.html',
  styleUrls: ['./po-items-sp.component.css']
})
export class PoItemsSpComponent implements OnInit {

  @Input() po : Invoice;

  public pvPo : Invoice = new Invoice();
  public pvwPo : Invoice = new Invoice();
  public acPo : Invoice = new Invoice();
  public battPo : Invoice = new Invoice();
  public otPo : Invoice = new Invoice();

  public revealPV : boolean = false;
  public revealPVW : boolean = false;
  public revealAC : boolean = false;
  public revealBATT : boolean = false;
  public revealOT : boolean = false;

  constructor() { }

  private splitMainIntoSubPos() : void {
    
    for(let i = 0; i < this.po.invoiceItems.length; i++){
      console.log('fish', this.po.invoiceItems[i].category);
      if(this.po.invoiceItems[i].category == 'pv')
      {
          
          this.pvPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.pvPo.amount += this.po.invoiceItems[i].productAmount;
          this.pvPo.expense += this.po.invoiceItems[i].productExpense;
          console.log('how come', this.po.invoiceItems[i].productExpense);
          this.pvPo.profit += this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense;
      }
      else if(this.po.invoiceItems[i].category == 'ac')
      {
          this.acPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.acPo.amount += this.po.invoiceItems[i].productAmount;
          this.acPo.expense += this.po.invoiceItems[i].productExpense;
          this.acPo.profit += this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense;
      }
      else if(this.po.invoiceItems[i].category == 'pvw')
      {
          this.pvwPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.pvwPo.amount += this.po.invoiceItems[i].productAmount;
          this.pvwPo.expense += this.po.invoiceItems[i].productExpense;
          this.pvwPo.profit += this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense;
      }
      if(this.po.invoiceItems[i].category == 'batt')
      {
          this.battPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.battPo.amount += this.po.invoiceItems[i].productAmount;
          this.battPo.expense += this.po.invoiceItems[i].productExpense;
          this.battPo.profit += this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense;
      }
      if(this.po.invoiceItems[i].category == 'ot')
      {
          this.otPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.otPo.amount += this.po.invoiceItems[i].productAmount;
          console.log(this.po.invoiceItems[i].product);
          this.otPo.expense += this.po.invoiceItems[i].productExpense;
          this.otPo.profit += this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense;
      }
    }
    this.pvPo.summary = 'PV SETUP';
    this.acPo.summary = 'AC';
    this.pvwPo.summary = 'PV CABLING';
    this.battPo.summary = 'BATTERY';
    this.otPo.summary = 'ADDITIONAL';
  }

  ngOnInit() : void{
    this.pvPo.invoiceItems = [];
    this.pvwPo.invoiceItems = [];
    this.acPo.invoiceItems = [];
    this.battPo.invoiceItems = [];
    this.otPo.invoiceItems = [];
    this.pvPo.amount = 0;
    this.acPo.amount = 0;
    this.pvwPo.amount = 0;
    this.battPo.amount = 0;
    this.otPo.amount = 0;

    this.pvPo.expense = 0;
    this.acPo.expense = 0;
    this.pvwPo.expense = 0;
    this.battPo.expense = 0;
    this.otPo.expense = 0;

    this.pvPo.profit = 0;
    this.acPo.profit = 0;
    this.pvwPo.profit = 0;
    this.battPo.profit = 0;
    this.otPo.profit = 0;
    this.splitMainIntoSubPos();
  }

}
