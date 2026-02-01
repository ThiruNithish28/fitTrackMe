import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightTracker } from './weight-tracker';

describe('WeightTracker', () => {
  let component: WeightTracker;
  let fixture: ComponentFixture<WeightTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
