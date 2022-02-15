import { TestBed } from '@angular/core/testing';

import { OfficeDesignService } from './office-design.service';

describe('OfficeDesignService', () => {
  let service: OfficeDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
