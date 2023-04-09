import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteOtherComponent } from './qoute-other.component';

describe('QouteOtherComponent', () => {
  let component: QouteOtherComponent;
  let fixture: ComponentFixture<QouteOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QouteOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QouteOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
