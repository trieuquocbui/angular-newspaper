import { TestBed } from '@angular/core/testing';

import { DeactivedGuard } from './deactived.guard';

describe('DeactivedGuard', () => {
  let guard: DeactivedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactivedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
