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

  constructor(private cdr: ChangeDetectorRef) {}

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
}
