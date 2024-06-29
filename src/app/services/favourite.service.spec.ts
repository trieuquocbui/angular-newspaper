/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavouriteService } from './favourite.service';

describe('Service: Favourite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavouriteService]
    });
  });

  it('should ...', inject([FavouriteService], (service: FavouriteService) => {
    expect(service).toBeTruthy();
  }));
});
