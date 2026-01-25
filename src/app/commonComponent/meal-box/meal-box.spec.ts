import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealBox } from './meal-box';

describe('MealBox', () => {
  let component: MealBox;
  let fixture: ComponentFixture<MealBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
