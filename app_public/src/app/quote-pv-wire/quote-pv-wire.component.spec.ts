import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePvWireComponent } from './quote-pv-wire.component';

describe('QuotePvWireComponent', () => {
  let component: QuotePvWireComponent;
  let fixture: ComponentFixture<QuotePvWireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePvWireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePvWireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
