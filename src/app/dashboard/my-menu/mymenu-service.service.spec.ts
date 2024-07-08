import { TestBed } from '@angular/core/testing';

import { MymenuServiceService } from './mymenu-service.service';

describe('MymenuServiceService', () => {
  let service: MymenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MymenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
