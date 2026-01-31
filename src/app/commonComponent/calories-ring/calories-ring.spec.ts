import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesRing } from './calories-ring';

describe('CaloriesRing', () => {
  let component: CaloriesRing;
  let fixture: ComponentFixture<CaloriesRing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloriesRing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriesRing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
