import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProtComponent } from './quote-prot.component';

describe('QuoteProtComponent', () => {
  let component: QuoteProtComponent;
  let fixture: ComponentFixture<QuoteProtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteProtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
