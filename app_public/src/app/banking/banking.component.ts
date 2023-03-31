import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
