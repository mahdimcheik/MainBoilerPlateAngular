import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canNotLoginGuard } from './can-login.guard';

describe('canLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canNotLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
