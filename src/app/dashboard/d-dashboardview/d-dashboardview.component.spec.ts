import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DDashboardviewComponent } from './d-dashboardview.component';

describe('DDashboardviewComponent', () => {
  let component: DDashboardviewComponent;
  let fixture: ComponentFixture<DDashboardviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DDashboardviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DDashboardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
