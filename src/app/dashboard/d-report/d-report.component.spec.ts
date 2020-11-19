import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DReportComponent } from './d-report.component';

describe('DReportComponent', () => {
  let component: DReportComponent;
  let fixture: ComponentFixture<DReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
