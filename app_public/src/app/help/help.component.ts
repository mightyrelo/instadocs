import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'How To?',
      strapline: ''
    },
    sideBar: {
      main: '',
      sub: 'a guide on how to perform tasks on InstaDocs'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
