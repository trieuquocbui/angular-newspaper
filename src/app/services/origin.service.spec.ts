/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OriginService } from './origin.service';

describe('Service: Origin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OriginService]
    });
  });

  it('should ...', inject([OriginService], (service: OriginService) => {
    expect(service).toBeTruthy();
  }));
});
