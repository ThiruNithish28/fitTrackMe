import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotCoach } from './robot-coach';

describe('RobotCoach', () => {
  let component: RobotCoach;
  let fixture: ComponentFixture<RobotCoach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotCoach]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotCoach);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
