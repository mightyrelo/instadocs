import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteBatComponent } from './qoute-bat.component';

describe('QouteBatComponent', () => {
  let component: QouteBatComponent;
  let fixture: ComponentFixture<QouteBatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QouteBatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QouteBatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
