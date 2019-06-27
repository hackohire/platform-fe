import { TestBed } from '@angular/core/testing';

import { DevApplicationService } from './dev-application.service';

describe('DevApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevApplicationService = TestBed.get(DevApplicationService);
    expect(service).toBeTruthy();
  });
});
