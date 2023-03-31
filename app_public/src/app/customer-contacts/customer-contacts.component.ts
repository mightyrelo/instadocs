import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.css']
})
export class CustomerContactsComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
