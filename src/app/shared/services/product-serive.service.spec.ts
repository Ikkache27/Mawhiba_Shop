import { TestBed } from '@angular/core/testing';

import { ProductSeriveService } from './product-serive.service';

describe('ProductSeriveService', () => {
  let service: ProductSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
