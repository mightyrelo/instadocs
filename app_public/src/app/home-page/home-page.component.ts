import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'InstaDocu - ',
      strapline: 'Installer\'s Invoicing App'
    },
    viewBar: {
      main: 'Create docs in an Instant!',
      sub: 'Quote in 60 seconds and Convert Quote to Invoice or Purchase Order at the click of a button.'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
