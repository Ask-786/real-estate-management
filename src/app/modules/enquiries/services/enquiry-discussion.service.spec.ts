import { TestBed } from '@angular/core/testing';

import { EnquiryDiscussionService } from './enquiry-discussion.service';

describe('EnquiryDiscussionService', () => {
  let service: EnquiryDiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryDiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
