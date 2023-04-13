import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCabComponent } from './quote-cab.component';

describe('QuoteCabComponent', () => {
  let component: QuoteCabComponent;
  let fixture: ComponentFixture<QuoteCabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
