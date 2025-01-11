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
import { concatMap, takeWhile, timer } from 'rxjs';
import { ProtocolService } from '../../services/protocol.service';

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
  isProcessing = false;
  progressPercentage = 0;

  constructor(
    private fileUploadService: RecordingService,
    private protocolService: ProtocolService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(stepper: MatStepper): void {
    this.isUploading = true;

    this.fileUploadService.uploadAudioFile(this.selectedFile!).subscribe({
      next: (response: UploadResponse) => {
        this.isUploading = false;
        sessionStorage.setItem('protocolID', response.id);

        this.isProcessing = true;
        // Send a pull notification request every 3 seconds
        const source = timer(0, 3000).pipe(
          takeWhile(() => this.isProcessing), // Continue while processing is true
          concatMap(() => {
            // Return the Observable for the API call
            return this.protocolService.getRecordingState();
          })
        );

        source.subscribe({
          next: (response) => {
            if (response.isDone) {
              this.isProcessing = false;
              sessionStorage.setItem(
                'step1Data',
                JSON.stringify(response.persons)
              );
              // Move to next step only when processing is done
              stepper.selected!.completed = true;
              this.stepCompleted.emit(); // Notify parent
              stepper.next(); // Move to next step
            } else if (!response.isAnnotationDone) {
              this.progressPercentage = 0; //TODO (maybe something better here)
            } else {
              // TODO: Wait for text generation: Percentage can be shown
              this.progressPercentage = Number(response.percentage.toFixed(2));
            }
          },
          error: () => {
            this.showError(
              'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
            );
          },
        });
      },
      error: () => {
        this.isUploading = false;
        this.showError(
          'Fehler beim Hochladen der Aufnahme. Bitte versuchen Sie es später erneut.'
        );
      },
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
    });
  }
}
