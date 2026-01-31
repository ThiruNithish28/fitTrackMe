import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonBtn } from './neon-btn';

describe('NeonBtn', () => {
  let component: NeonBtn;
  let fixture: ComponentFixture<NeonBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
