import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintPoContentComponent } from './view-print-po-content.component';

describe('ViewPrintPoContentComponent', () => {
  let component: ViewPrintPoContentComponent;
  let fixture: ComponentFixture<ViewPrintPoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrintPoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintPoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
