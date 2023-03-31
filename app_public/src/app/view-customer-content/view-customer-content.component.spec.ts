import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerContentComponent } from './view-customer-content.component';

describe('ViewCustomerContentComponent', () => {
  let component: ViewCustomerContentComponent;
  let fixture: ComponentFixture<ViewCustomerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
