import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quote-items',
  templateUrl: './quote-items.component.html',
  styleUrls: ['./quote-items.component.css']
})
export class QuoteItemsComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
