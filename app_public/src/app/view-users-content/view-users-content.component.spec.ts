import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersContentComponent } from './view-users-content.component';

describe('ViewUsersContentComponent', () => {
  let component: ViewUsersContentComponent;
  let fixture: ComponentFixture<ViewUsersContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsersContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
