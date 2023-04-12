import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteItemsSpComponent } from './quote-items-sp.component';

describe('QuoteItemsSpComponent', () => {
  let component: QuoteItemsSpComponent;
  let fixture: ComponentFixture<QuoteItemsSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteItemsSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteItemsSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
