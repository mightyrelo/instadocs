import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserContentComponent } from './view-user-content.component';

describe('ViewUserContentComponent', () => {
  let component: ViewUserContentComponent;
  let fixture: ComponentFixture<ViewUserContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
