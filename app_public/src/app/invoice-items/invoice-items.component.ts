import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-items',
  templateUrl: './invoice-items.component.html',
  styleUrls: ['./invoice-items.component.css']
})
export class InvoiceItemsComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
