import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transcript } from '../../models/protocol.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocolService } from '../../services/protocol.service';
import { MatStepper } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { CustomTextLoaderComponent } from '../../custom-loaders/custom-text-loader/custom-text-loader.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-transcript-step',
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    MatProgressSpinnerModule,
    MatTooltip,
    MatIconButton,
    CustomTextLoaderComponent,
  ],
  templateUrl: './edit-transcript-step.component.html',
  styleUrl: './edit-transcript-step.component.scss',
})
export class EditTranscriptStepComponent implements OnInit {
  @Input() stepper!: MatStepper;
  @Output() stepCompleted = new EventEmitter<void>();

  transcript: Transcript = { segments: [] };

  meetingDate!: string;
  attendees!: number;
  location = 'München';

  requestSent = false;

  constructor(
    private protocolService: ProtocolService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.meetingDate = new Date().toISOString().split('T')[0];
    const savedData = sessionStorage.getItem('step3Data');
    if (savedData) {
      this.transcript = JSON.parse(savedData);
    }
    const uniqueSpeakers = new Set(
      this.transcript.segments.map((s) => s.speaker)
    );
    this.attendees = uniqueSpeakers.size;
  }

  deleteSegment(index: number) {
    const confirmation = confirm(
      `Möchten Sie diesen Beitrag wirklich löschen?`
    );
    if (confirmation) {
      this.transcript.segments.splice(index, 1);
    }
  }

  saveTranscript(): void {
    this.requestSent = true;
    sessionStorage.setItem('step3Data', JSON.stringify(this.transcript));
    this.protocolService
      .sendTranscriptToBackend(this.transcript)
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('step4Data', JSON.stringify(response));
          this.requestSent = false;
          this.stepper.selected!.completed = true;
          this.stepCompleted.emit(); // Notify parent
          this.stepper.next();
        },
        error: (error) => {
          this.requestSent = false;
          this.showError(
            'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
          );
          console.error('Failed to save transcript:', error);
        },
      });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
    });
  }
}
