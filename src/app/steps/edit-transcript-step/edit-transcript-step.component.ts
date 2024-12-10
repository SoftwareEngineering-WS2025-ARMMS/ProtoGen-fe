import { Component, Input, OnInit } from '@angular/core';
import { Transcript } from '../../models/protocol.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocolService } from '../../services/protocol.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-edit-transcript-step',
  imports: [NgFor, FormsModule],
  templateUrl: './edit-transcript-step.component.html',
  styleUrl: './edit-transcript-step.component.scss',
})
export class EditTranscriptStepComponent implements OnInit {
  @Input() stepper!: MatStepper;
  transcript: Transcript = { segments: [] };

  meetingDate!: string;
  attendees!: number;
  location = 'München';

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
    sessionStorage.setItem('step3Data', JSON.stringify(this.transcript));
    this.protocolService
      .sendTranscriptToBackendmocked(this.transcript)
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('step4Data', JSON.stringify(response));
          this.stepper.next();
        },
        error: (error) => {
          console.error('Failed to save transcript:', error);
        },
      });
  }
}
