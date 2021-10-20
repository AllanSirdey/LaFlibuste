import { TestBed } from '@angular/core/testing';

import { NbaDataService } from './nba-data.service';

describe('NbaDataService', () => {
  let service: NbaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
