import { Component } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { UploadStepComponent } from '../steps/upload-step/upload-step.component';
import { IdentifySpeakersStepComponent } from '../steps/identify-speakers-step/identify-speakers-step.component';
import { EditProtocolStepComponent } from '../steps/edit-protocol-step/edit-protocol-step.component';
import { EditTranscriptStepComponent } from '../steps/edit-transcript-step/edit-transcript-step.component';

@Component({
  selector: 'app-stepper',
  imports: [
    MatStepperModule,
    UploadStepComponent,
    IdentifySpeakersStepComponent,
    EditProtocolStepComponent,
    EditTranscriptStepComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  goNextStep(stepper: MatStepper): void {
    stepper.next();
  }

  finishProcess(): void {
    alert('Protocol creation complete!');
  }
}
