import { TestBed } from '@angular/core/testing';

import { ProtocolService } from './protocol.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProtocolService', () => {
  let service: ProtocolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProtocolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
