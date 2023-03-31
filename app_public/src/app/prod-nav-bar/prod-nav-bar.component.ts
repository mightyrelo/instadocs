import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'app-prod-nav-bar',
  templateUrl: './prod-nav-bar.component.html',
  styleUrls: ['./prod-nav-bar.component.css']
})
export class ProdNavBarComponent implements OnInit {

  @Input() selectedProducts : Product[];

  constructor() { }

  ngOnInit() {
  }

}
