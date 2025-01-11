import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UploadResponse } from '../models/upload.response';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  private uploadUrl = environment.apiUrl;

  private http = inject(HttpClient);

  uploadAudioFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(
      `${this.uploadUrl}/api/upload-audio`,
      formData
    );
  }

  uploadAudioMock(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const mockResponse: UploadResponse = {
      id: 'abcdefg',
    };

    return of(mockResponse).pipe(delay(5000));
  }
}
