import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFormSpComponent } from './quote-form-sp.component';

describe('QuoteFormSpComponent', () => {
  let component: QuoteFormSpComponent;
  let fixture: ComponentFixture<QuoteFormSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteFormSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteFormSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
