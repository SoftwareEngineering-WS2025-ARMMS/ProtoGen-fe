import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UploadResponse } from '../models/upload.response';

@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  private uploadUrl = 'https://armms-protogen-be.aorief.com/api/upload-audio';
  //private uploadUrl = 'http://localhost:5000/api/upload-audio';

  private http = inject(HttpClient);

  uploadAudioFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(this.uploadUrl, formData);
  }

  uploadAudioMock(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const mockResponse: UploadResponse = {
      id: 'abcdefg',
      persons: {
        person0:
          'Willkommen zu unserem heutigen Treffen! Wir haben viel zu besprechen, also lasst uns direkt anfangen.',
        person1:
          'Danke, dass ihr alle gekommen seid. Ich wollte mit euch über die Planung des Sommerfestes sprechen.',
        person2:
          'Ja, das ist ein wichtiges Thema. Wir müssen noch entscheiden, wer sich um die Sponsoren kümmert.',
      },
    };

    return of(mockResponse).pipe(delay(5000));
  }
}
