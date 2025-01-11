import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [StepperComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize step completion status from session storage', () => {
    sessionStorage.setItem('step1Data', 'true');
    sessionStorage.setItem('step2Data', 'true');
    sessionStorage.setItem('step3Data', 'true');

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const newComponent = fixture.componentInstance;
    expect(newComponent.isStep1Completed).toBeTrue();
    expect(newComponent.isStep2Completed).toBeTrue();
    expect(newComponent.isStep3Completed).toBeTrue();
  });

  it('should navigate to the next step', () => {
    const mockStepper = jasmine.createSpyObj<MatStepper>('MatStepper', [
      'next',
    ]);
    component.goNextStep(mockStepper);
    expect(mockStepper.next).toHaveBeenCalled();
  });

  it('should mark a step as completed', () => {
    component.markStepCompleted(1);
    expect(component.isStep1Completed).toBeTrue();

    component.markStepCompleted(2);
    expect(component.isStep2Completed).toBeTrue();

    component.markStepCompleted(3);
    expect(component.isStep3Completed).toBeTrue();
  });

  it('should clear session storage and navigate to the home page on reset', () => {
    sessionStorage.setItem('step1Data', 'true');
    sessionStorage.setItem('step2Data', 'true');

    component.reset();
    expect(sessionStorage.getItem('step1Data')).toBeNull();
    expect(sessionStorage.getItem('step2Data')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
