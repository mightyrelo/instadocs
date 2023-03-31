import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {

  public pageContent = {
    header: {
      title: '',
      strapline: 'Companies on Ngamla'
    },
    viewBar: {
      main: '',
      sub: 'this view should only be visible to admin users'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
