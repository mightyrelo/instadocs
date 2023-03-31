import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.css']
})
export class ViewHeaderComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
