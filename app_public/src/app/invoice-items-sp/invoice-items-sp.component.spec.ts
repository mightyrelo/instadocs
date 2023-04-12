import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemsSpComponent } from './invoice-items-sp.component';

describe('InvoiceItemsSpComponent', () => {
  let component: InvoiceItemsSpComponent;
  let fixture: ComponentFixture<InvoiceItemsSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceItemsSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemsSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
