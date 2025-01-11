import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStepComponent } from './upload-step.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RecordingService } from '../../services/recording.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

describe('UploadStepComponent', () => {
  let component: UploadStepComponent;
  let fixture: ComponentFixture<UploadStepComponent>;
  let recordingService: jasmine.SpyObj<RecordingService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const recordingServiceSpy = jasmine.createSpyObj('RecordingService', [
      'uploadAudioFile',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [UploadStepComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: RecordingService, useValue: recordingServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadStepComponent);
    component = fixture.componentInstance;
    recordingService = TestBed.inject(
      RecordingService
    ) as jasmine.SpyObj<RecordingService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedFile when a file is selected', () => {
    const file = new File(['dummy content'], 'test.mp3', { type: 'audio/mp3' });
    const input = document.createElement('input');
    input.type = 'file';
    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: { files: [file] },
      writable: false,
    });

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
  });

  it('should show an error when upload fails', () => {
    const file = new File(['dummy content'], 'test.mp3', { type: 'audio/mp3' });
    const stepper = jasmine.createSpyObj('MatStepper', ['next']);
    recordingService.uploadAudioFile.and.returnValue(
      throwError(() => new Error('Upload failed'))
    );

    component.selectedFile = file;
    component.uploadFile(stepper);

    expect(recordingService.uploadAudioFile).toHaveBeenCalledWith(file);
    expect(component.isUploading).toBeFalse();
    expect(component.stepData).toBeNull();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Fehler beim Hochladen der Aufnahme. Bitte versuchen Sie es später erneut.',
      'Schließen',
      { duration: 5000 }
    );
  });
});
