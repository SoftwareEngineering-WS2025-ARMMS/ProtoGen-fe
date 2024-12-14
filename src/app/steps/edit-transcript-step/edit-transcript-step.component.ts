import { Component, Input, OnInit } from '@angular/core';
import { Transcript } from '../../models/protocol.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocolService } from '../../services/protocol.service';
import { MatStepper } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-transcript-step',
  imports: [NgFor, NgIf, FormsModule, MatProgressSpinnerModule],
  templateUrl: './edit-transcript-step.component.html',
  styleUrl: './edit-transcript-step.component.scss',
})
export class EditTranscriptStepComponent implements OnInit {
  @Input() stepper!: MatStepper;
  transcript: Transcript = { segments: [] };

  meetingDate!: string;
  attendees!: number;
  location = 'München';

  requestSent = false;

  constructor(private protocolService: ProtocolService) {}

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

  saveTranscript(): void {
    this.requestSent = true;
    sessionStorage.setItem('step3Data', JSON.stringify(this.transcript));
    this.protocolService
      .sendTranscriptToBackend(this.transcript)
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('step4Data', JSON.stringify(response));
          this.requestSent = false;
          this.stepper.next();
        },
        error: (error) => {
          this.requestSent = false;
          console.error('Failed to save transcript:', error);
        },
      });
  }
}
