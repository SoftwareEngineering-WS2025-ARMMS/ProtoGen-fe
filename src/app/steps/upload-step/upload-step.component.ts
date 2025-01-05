import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RecordingService } from '../../services/recording.service';
import { MatStepper } from '@angular/material/stepper';
import { UploadResponse } from '../../models/upload.response';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { CustomAudioLoaderComponent } from '../../custom-loaders/custom-audio-loader/custom-audio-loader.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-step',
  imports: [
    MatIcon,
    NgIf,
    MatProgressSpinnerModule,
    MatTooltip,
    CustomAudioLoaderComponent,
  ],
  templateUrl: './upload-step.component.html',
  styleUrl: './upload-step.component.scss',
})
export class UploadStepComponent {
  @Input() stepper!: MatStepper;
  @Output() stepCompleted = new EventEmitter<void>(); // Notify parent
  selectedFile: File | null = null;
  isUploading = false;
  errorMessage = '';

  // Data to pass to the next step
  stepData: UploadResponse | null = null;

  constructor(
    private fileUploadService: RecordingService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.errorMessage = '';
    }
  }

  uploadFile(stepper: MatStepper): void {
    this.isUploading = true;

    this.fileUploadService.uploadAudioMock(this.selectedFile!).subscribe({
      next: (response: UploadResponse) => {
        this.isUploading = false;
        this.stepData = response;
        sessionStorage.setItem('step1Data', JSON.stringify(this.stepData));
        stepper.selected!.completed = true;
        this.stepCompleted.emit(); // Notify parent
        stepper.next();
      },
      error: (error) => {
        this.isUploading = false;
        this.showError(
          'Fehler beim Hochladen der Aufnahme. Bitte versuchen Sie es erneut.'
        );
        console.error(error);
      },
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
    });
  }
}
