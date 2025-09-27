import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canResetGuard } from './can-reset.guard';

describe('canResetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canResetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
