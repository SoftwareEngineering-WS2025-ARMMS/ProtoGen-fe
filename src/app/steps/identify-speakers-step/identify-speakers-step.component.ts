import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

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
  persons: Record<string, string> = {};
  names: Record<string, string> = {};
  personKeys: string[] = [];

  constructor(private http: HttpClient) {}

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

    // // Send data to backend
    // this.http.post('/api/save-person-name', updatedData).subscribe({
    //   next: () => {
    //     console.log(`Saved name for ${person}: ${this.names[person]}`);
    //     // Update sessionStorage
    //     sessionStorage.setItem('step2Data', JSON.stringify(this.names));
    //   },
    //   error: (error) => {
    //     console.error('Failed to save name:', error);
    //   },
    // });
  }
}
