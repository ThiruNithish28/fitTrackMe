import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerInput } from './ruler-input';

describe('RulerInput', () => {
  let component: RulerInput;
  let fixture: ComponentFixture<RulerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulerInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
