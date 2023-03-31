import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.css']
})
export class CompanyContactComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
