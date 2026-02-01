import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AddFood } from './add-food';

describe('AddFood', () => {
  let component: AddFood;
  let fixture: ComponentFixture<AddFood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFood],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({ meal: 'Breakfast' }) } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reads meal from query params', () => {
    expect(component.preselectedMeal()).toBe('Breakfast');
  });
});
