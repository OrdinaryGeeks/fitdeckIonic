import { TestBed } from '@angular/core/testing';

import { FitDeckService } from './fit-deck.service';

describe('FitDeckService', () => {
  let service: FitDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
