import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsviewComponent } from './statisticsview.component';

describe('StatisticsviewComponent', () => {
  let component: StatisticsviewComponent;
  let fixture: ComponentFixture<StatisticsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
