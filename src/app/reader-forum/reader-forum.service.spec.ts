import { TestBed } from '@angular/core/testing';

import { ReaderForumService } from './reader-forum.service';

describe('ReaderForumService', () => {
  let service: ReaderForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaderForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
