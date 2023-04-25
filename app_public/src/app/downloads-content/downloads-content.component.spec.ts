import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsContentComponent } from './downloads-content.component';

describe('DownloadsContentComponent', () => {
  let component: DownloadsContentComponent;
  let fixture: ComponentFixture<DownloadsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
