import { TestBed } from '@angular/core/testing';

import { BankDataService } from './bank-data.service';

describe('BankDataService', () => {
  let service: BankDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
