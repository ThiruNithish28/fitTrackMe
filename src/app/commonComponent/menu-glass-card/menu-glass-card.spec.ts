import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGlassCard } from './menu-glass-card';

describe('MenuGlassCard', () => {
  let component: MenuGlassCard;
  let fixture: ComponentFixture<MenuGlassCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuGlassCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGlassCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
