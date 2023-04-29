import { Component, OnInit, Input, ElementRef, ViewChild,} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { CompanyDataService } from '../company-data.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-tag',
  templateUrl: './company-tag.component.html',
  styleUrls: ['./company-tag.component.css']
})
export class CompanyTagComponent implements OnInit {

  private apiBaseUrl = environment.apiBaseUrl;
  public logoBaseUrl : string;

  @Input() content: any;


  public companyLogo : any;

  constructor(
    private companyDataService : CompanyDataService,
    private sanitizer : DomSanitizer
  ) { }

  

  

  private fetchCompanyLogo() : void {
      this.companyDataService.downloadLogo(this.content.logo)
        .then(image => {
            console.log('sanitized url', image);

        })
    
  }

  ngOnInit() {
   // this.companyLogo = `/assets/images/${this.content.logo}`;
   console.log('content', this.content.logo);
   const idx = this.apiBaseUrl.lastIndexOf('/');
   this.logoBaseUrl = this.apiBaseUrl.substring(0, idx);
   this.companyLogo = `${this.logoBaseUrl}/logos/${this.content.logo}`;
    console.log('hierso', this.companyLogo);
  }

}
