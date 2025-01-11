import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ProtocolService } from '../../services/protocol.service';
import { Annotations } from '../../models/protocol.model';
import { MatStepper } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-identify-speakers-step',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInput,
    MatIcon,
    MatProgressSpinnerModule,
    MatTooltip,
  ],
  templateUrl: './identify-speakers-step.component.html',
  styleUrl: './identify-speakers-step.component.scss',
})
export class IdentifySpeakersStepComponent implements OnInit {
  @Input() stepper!: MatStepper;
  @Output() stepCompleted = new EventEmitter<void>();
  persons: Record<string, string> = {};
  names: Annotations = {};
  personKeys: string[] = [];
  requestSent = false;
  isProcessing = false;

  constructor(
    private protocolService: ProtocolService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isProcessing = true;
    // Send a pull notification request every 3 secs
    const source = timer(0, 3000).pipe(
    takeWhile(() => this.isProcessing), // Continue while processing is true
    concatMap(() => {
      // Return the Observable for the API call
      return this.protocolService.getRecordingState();
    })
    );
    source.subscribe({
      next: (response) => {
        console.log('Inside subscribe');
        if (response.isDone) {
          this.isProcessing = false;
          this.persons = response.persons || {};
          this.personKeys = Object.keys(this.persons);

          const savedNames = sessionStorage.getItem('step2Data');
          if (savedNames) {
            this.names = JSON.parse(savedNames);
          } else {
            this.names = this.personKeys.reduce(
              (acc, key) => ({ ...acc, [key]: '' }),
              {}
            );
          }
        } else if (!response.isAnnotationDone) {
          // TODO: Wait for annotation: Percentage cannot be shown (Unfortunately)
          this.showError(`Annotation is not done yet...`);
        } else {
          // TODO: Wait for text generation: Percentage can be shown
          this.showError(`Processing is at ${response.percentage.toFixed(2)}%`);
        }
      },
      error: (error) => {
        this.showError(
          'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
        );
        console.error('Failed to save name:', error);
      },
    });
  }

  saveAll(): void {
    this.requestSent = true;
    sessionStorage.setItem('step2Data', JSON.stringify(this.names));

    this.protocolService.sendAnnotations(this.names).subscribe({
      next: (response) => {
        sessionStorage.setItem('step3Data', JSON.stringify(response));
        this.requestSent = false;
        this.stepper.selected!.completed = true;
        this.stepCompleted.emit();
        this.stepper.next();
      },
      error: () => {
        this.requestSent = false;
        this.showError(
          'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
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
