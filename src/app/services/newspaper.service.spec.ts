/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewspaperService } from './newspaper.service';

describe('Service: Newspaper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewspaperService]
    });
  });

  it('should ...', inject([NewspaperService], (service: NewspaperService) => {
    expect(service).toBeTruthy();
  }));
});
