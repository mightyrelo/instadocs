import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdNavBarComponent } from './prod-nav-bar.component';

describe('ProdNavBarComponent', () => {
  let component: ProdNavBarComponent;
  let fixture: ComponentFixture<ProdNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
