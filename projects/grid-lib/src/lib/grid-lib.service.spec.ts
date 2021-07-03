import { TestBed } from '@angular/core/testing';

import { GridLibService } from './grid-lib.service';

describe('GridLibService', () => {
  let service: GridLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
