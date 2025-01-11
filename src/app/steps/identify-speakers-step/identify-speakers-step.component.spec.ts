import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IdentifySpeakersStepComponent } from './identify-speakers-step.component';
import { ProtocolService } from '../../services/protocol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IdentifySpeakersStepComponent', () => {
  let component: IdentifySpeakersStepComponent;
  let fixture: ComponentFixture<IdentifySpeakersStepComponent>;
  let protocolService: jasmine.SpyObj<ProtocolService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const protocolServiceSpy = jasmine.createSpyObj('ProtocolService', [
      'sendAnnotations',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [IdentifySpeakersStepComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClientTesting(),
        { provide: ProtocolService, useValue: protocolServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentifySpeakersStepComponent);
    component = fixture.componentInstance;
    protocolService = TestBed.inject(
      ProtocolService
    ) as jasmine.SpyObj<ProtocolService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data from session storage', () => {
    const mockPersons = { person1: 'Speaker 1', person2: 'Speaker 2' };
    const mockNames = { person1: 'John', person2: 'Jane' };

    sessionStorage.setItem('step1Data', JSON.stringify(mockPersons));
    sessionStorage.setItem('step2Data', JSON.stringify(mockNames));

    component.ngOnInit();

    expect(component.persons).toEqual(mockPersons);
    expect(component.names).toEqual(mockNames);
    expect(component.personKeys).toEqual(Object.keys(mockPersons));
  });

  it('should initialize names with empty values if step2Data is not present', () => {
    const mockPersons = { person1: 'Speaker 1', person2: 'Speaker 2' };

    sessionStorage.setItem('step1Data', JSON.stringify(mockPersons));
    sessionStorage.removeItem('step2Data');

    component.ngOnInit();

    expect(component.persons).toEqual(mockPersons);
    expect(component.names).toEqual({ person1: '', person2: '' });
    expect(component.personKeys).toEqual(Object.keys(mockPersons));
  });

  it('should save data and proceed to the next step on success', () => {
    const mockResponse = {
      segments: [
        {
          speaker: 'John',
          text: 'Willkommen',
        },
        {
          speaker: 'Jenny',
          text: 'Danke',
        },
      ],
    };
    const mockStepper = jasmine.createSpyObj('MatStepper', ['next']);
    mockStepper.selected = { completed: false };

    component.stepper = mockStepper;
    component.names = { person1: 'John', person2: 'Jane' };

    protocolService.sendAnnotations.and.returnValue(of(mockResponse));

    spyOn(component.stepCompleted, 'emit');

    component.saveAll();

    expect(component.requestSent).toBeFalse();
    expect(protocolService.sendAnnotations).toHaveBeenCalledWith(
      component.names
    );
    expect(sessionStorage.getItem('step2Data')).toBe(
      JSON.stringify(component.names)
    );
    expect(sessionStorage.getItem('step3Data')).toBe(
      JSON.stringify(mockResponse)
    );
    expect(mockStepper.next).toHaveBeenCalled();
    expect(component.stepCompleted.emit).toHaveBeenCalled();
  });

  it('should show an error and reset requestSent on failure', () => {
    const mockStepper = jasmine.createSpyObj('MatStepper', ['next']);
    component.stepper = mockStepper;
    component.names = { person1: 'John', person2: 'Jane' };

    protocolService.sendAnnotations.and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.saveAll();

    expect(component.requestSent).toBeFalse();
    expect(protocolService.sendAnnotations).toHaveBeenCalledWith(
      component.names
    );
    expect(snackBar.open).toHaveBeenCalledWith(
      'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      'Schließen',
      { duration: 5000 }
    );
  });
});
