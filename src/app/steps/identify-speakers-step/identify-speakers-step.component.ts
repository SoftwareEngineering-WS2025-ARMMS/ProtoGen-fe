import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ProtocolService } from '../../services/protocol.service';
import { Annotations } from '../../models/protocol.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-identify-speakers-step',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInput,
    MatIcon,
  ],
  templateUrl: './identify-speakers-step.component.html',
  styleUrl: './identify-speakers-step.component.scss',
})
export class IdentifySpeakersStepComponent implements OnInit {
  @Input() stepper!: MatStepper;
  persons: Record<string, string> = {};
  names: Annotations = {};
  personKeys: string[] = [];

  constructor(private protocolService: ProtocolService) {}

  ngOnInit(): void {
    const savedData = sessionStorage.getItem('step1Data');
    if (savedData) {
      const response = JSON.parse(savedData);
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
    }
  }

  saveAll(): void {
    sessionStorage.setItem('step2Data', JSON.stringify(this.names));

    this.protocolService.sendAnnotationsMocked(this.names).subscribe({
      next: (response) => {
        sessionStorage.setItem('step3Data', JSON.stringify(response));
        this.stepper.next();
      },
      error: (error) => {
        console.error('Failed to save name:', error);
      },
    });
  }
}
