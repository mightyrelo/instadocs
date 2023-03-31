import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomersContentComponent } from './view-customers-content.component';

describe('ViewCustomersContentComponent', () => {
  let component: ViewCustomersContentComponent;
  let fixture: ComponentFixture<ViewCustomersContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomersContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
