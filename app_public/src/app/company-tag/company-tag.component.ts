import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-tag',
  templateUrl: './company-tag.component.html',
  styleUrls: ['./company-tag.component.css']
})
export class CompanyTagComponent implements OnInit {

  @Input() content: any;

  public companyLogo : string;

  constructor() { }

  ngOnInit() {
    this.companyLogo = `/assets/images/${this.content.userId}.png`;
      console.log(this.companyLogo);
  }

}
