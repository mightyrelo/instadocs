import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintPoComponent } from './view-print-po.component';

describe('ViewPrintPoComponent', () => {
  let component: ViewPrintPoComponent;
  let fixture: ComponentFixture<ViewPrintPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrintPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
