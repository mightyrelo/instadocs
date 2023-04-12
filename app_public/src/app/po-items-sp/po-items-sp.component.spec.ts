import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoItemsSpComponent } from './po-items-sp.component';

describe('PoItemsSpComponent', () => {
  let component: PoItemsSpComponent;
  let fixture: ComponentFixture<PoItemsSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoItemsSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoItemsSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
