import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Ngamla - ',
      strapline: 'Installer\'s Invoicing App!'
    },
    viewBar: {
      main: 'Prepare documents on the move',
      sub: 'Whether it\'s a mobile phone, lap or desktop, Ngamla! is accessible from any device with an internet connection and this means that quotes, invoices and other documents can prepared from anywhere.'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
