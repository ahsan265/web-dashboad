import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficitymapComponent } from './traficitymap.component';

describe('TraficitymapComponent', () => {
  let component: TraficitymapComponent;
  let fixture: ComponentFixture<TraficitymapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraficitymapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraficitymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
