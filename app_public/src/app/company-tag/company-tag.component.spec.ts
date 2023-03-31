import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTagComponent } from './company-tag.component';

describe('CompanyTagComponent', () => {
  let component: CompanyTagComponent;
  let fixture: ComponentFixture<CompanyTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
