import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.css']
})
export class PoDetailsComponent implements OnInit {

  @Input() content: any;
  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
