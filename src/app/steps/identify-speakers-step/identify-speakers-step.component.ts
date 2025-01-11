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

  constructor(
    private protocolService: ProtocolService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const savedData = sessionStorage.getItem('step1Data');
    if (savedData) {
      const response = JSON.parse(savedData);
      this.persons = response || {};
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
    }
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
