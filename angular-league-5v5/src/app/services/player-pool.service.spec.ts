import { TestBed } from '@angular/core/testing';

import { PlayerPoolService } from './player-pool.service';

describe('PlayerPoolService', () => {
  let service: PlayerPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
