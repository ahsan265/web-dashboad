import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DMapComponent } from './d-map.component';

describe('DMapComponent', () => {
  let component: DMapComponent;
  let fixture: ComponentFixture<DMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
