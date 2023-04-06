import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteAcComponent } from './qoute-ac.component';

describe('QouteAcComponent', () => {
  let component: QouteAcComponent;
  let fixture: ComponentFixture<QouteAcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QouteAcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QouteAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
