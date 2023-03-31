import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductContentComponent } from './view-product-content.component';

describe('ViewProductContentComponent', () => {
  let component: ViewProductContentComponent;
  let fixture: ComponentFixture<ViewProductContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
