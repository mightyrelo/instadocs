import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintInvoiceComponent } from './view-print-invoice.component';

describe('ViewPrintInvoiceComponent', () => {
  let component: ViewPrintInvoiceComponent;
  let fixture: ComponentFixture<ViewPrintInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrintInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
