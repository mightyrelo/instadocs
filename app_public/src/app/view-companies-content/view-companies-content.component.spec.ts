import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompaniesContentComponent } from './view-companies-content.component';

describe('ViewCompaniesContentComponent', () => {
  let component: ViewCompaniesContentComponent;
  let fixture: ComponentFixture<ViewCompaniesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompaniesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompaniesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
