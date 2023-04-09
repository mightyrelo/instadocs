import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoutePvComponent } from './qoute-pv.component';

describe('QoutePvComponent', () => {
  let component: QoutePvComponent;
  let fixture: ComponentFixture<QoutePvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoutePvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoutePvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
