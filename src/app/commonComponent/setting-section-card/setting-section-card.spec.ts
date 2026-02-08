import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSectionCard } from './setting-section-card';

describe('SettingSectionCard', () => {
  let component: SettingSectionCard;
  let fixture: ComponentFixture<SettingSectionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSectionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingSectionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
