import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DGraphComponent } from './d-graph.component';

describe('DGraphComponent', () => {
  let component: DGraphComponent;
  let fixture: ComponentFixture<DGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
