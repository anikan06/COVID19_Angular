import { TestBed } from '@angular/core/testing';

import { ServiceAvailablityService } from './service-availablity.service';

describe('ServiceAvailablityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAvailablityService = TestBed.get(ServiceAvailablityService);
    expect(service).toBeTruthy();
  });
});
