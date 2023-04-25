import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Settings',
      strapline: ''
    },
    sideBar: {
      main: '',
      sub: 'update credentials, select templates'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
