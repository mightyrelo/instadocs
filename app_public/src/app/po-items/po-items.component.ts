import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-items',
  templateUrl: './po-items.component.html',
  styleUrls: ['./po-items.component.css']
})
export class PoItemsComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
