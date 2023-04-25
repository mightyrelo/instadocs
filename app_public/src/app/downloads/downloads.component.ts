import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Download',
      strapline: 'Get the latest prices'
    },
    sideBar: {
      main: '',
      sub: 'prices are updated regularly.'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
