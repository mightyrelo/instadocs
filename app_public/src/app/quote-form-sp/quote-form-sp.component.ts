import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quote-form-sp',
  templateUrl: './quote-form-sp.component.html',
  styleUrls: ['./quote-form-sp.component.css']
})
export class QuoteFormSpComponent implements OnInit {

  @Input() dbCustomer : any;

  constructor() { }

  ngOnInit() {
  }

}
