import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDbComponent } from './transfer-db.component';

describe('TransferDbComponent', () => {
  let component: TransferDbComponent;
  let fixture: ComponentFixture<TransferDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
