import { TestBed } from '@angular/core/testing';

import { RecordingService } from './recording.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RecordingService', () => {
  let service: RecordingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RecordingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
