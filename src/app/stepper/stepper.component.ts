import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { UploadStepComponent } from '../steps/upload-step/upload-step.component';
import { IdentifySpeakersStepComponent } from '../steps/identify-speakers-step/identify-speakers-step.component';
import { EditProtocolStepComponent } from '../steps/edit-protocol-step/edit-protocol-step.component';
import { EditTranscriptStepComponent } from '../steps/edit-transcript-step/edit-transcript-step.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

interface StepperIconContext {
  index: number;
}

@Component({
  selector: 'app-stepper',
  imports: [
    MatStepperModule,
    UploadStepComponent,
    IdentifySpeakersStepComponent,
    EditProtocolStepComponent,
    EditTranscriptStepComponent,
    MatIcon,
    NgTemplateOutlet,
    NgIf,
    MatButton,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class StepperComponent implements AfterViewInit {
  @ViewChildren('stepperIcon') private matStepperIconViewChildren!: QueryList<
    TemplateRef<StepperIconContext>
  >;

  matStepperIcons!: TemplateRef<StepperIconContext>[];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.matStepperIcons = this.matStepperIconViewChildren.toArray();
    this.cdr.detectChanges();
  }
  goNextStep(stepper: MatStepper): void {
    stepper.next();
  }

  finishProcess(): void {
    alert('Protocol creation complete!');
  }

  // Check session storage for step completion
  isStep1Completed = this.checkStepCompletion('step1Data');
  isStep2Completed = this.checkStepCompletion('step2Data');
  isStep3Completed = this.checkStepCompletion('step3Data');

  // Function to check if step data is available in sessionStorage
  checkStepCompletion(stepKey: string): boolean {
    return sessionStorage.getItem(stepKey) !== null;
  }

  markStepCompleted(stepNumber: number): void {
    if (stepNumber === 1) this.isStep1Completed = true;
    if (stepNumber === 2) this.isStep2Completed = true;
    if (stepNumber === 3) this.isStep3Completed = true;
  }

  reset(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
