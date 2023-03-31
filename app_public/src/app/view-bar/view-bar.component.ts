import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-bar',
  templateUrl: './view-bar.component.html',
  styleUrls: ['./view-bar.component.css']
})
export class ViewBarComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
