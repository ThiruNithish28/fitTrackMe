import { TestBed } from '@angular/core/testing';

import { CalculationEnginer } from './calculation-enginer';

describe('CalculationEnginer', () => {
  let service: CalculationEnginer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationEnginer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
