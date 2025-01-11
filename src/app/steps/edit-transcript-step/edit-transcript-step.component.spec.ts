import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranscriptStepComponent } from './edit-transcript-step.component';

import { of, throwError } from 'rxjs';
import { ProtocolService } from '../../services/protocol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

describe('EditTranscriptStepComponent', () => {
  let component: EditTranscriptStepComponent;
  let fixture: ComponentFixture<EditTranscriptStepComponent>;
  let mockProtocolService: jasmine.SpyObj<ProtocolService>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  let mockStepper: any;

  beforeEach(async () => {
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => {
      if (key === 'step3Data') {
        return JSON.stringify({
          segments: [
            { text: 'Sample Segment 1', speaker: 'Speaker 1' },
            { text: 'Sample Segment 2', speaker: 'Speaker 2' },
          ],
        });
      }
      return null;
    });
    spyOn(window.sessionStorage, 'setItem').and.callThrough();

    mockProtocolService = jasmine.createSpyObj('ProtocolService', [
      'sendTranscriptToBackend',
    ]);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockStepper = jasmine.createSpyObj('MatStepper', ['next', 'selected']);
    mockStepper.selected = { completed: false };

    await TestBed.configureTestingModule({
      imports: [EditTranscriptStepComponent],
      providers: [
        { provide: ProtocolService, useValue: mockProtocolService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: MatStepper, useValue: mockStepper },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTranscriptStepComponent);
    component = fixture.componentInstance;
    component.stepper = mockStepper;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load transcript from sessionStorage on ngOnInit', () => {
    expect(component.transcript).toBeTruthy();
    expect(component.transcript.segments.length).toBe(2);
  });

  it('should delete segment when confirmation is given', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const initialLength = component.transcript.segments.length;
    component.deleteSegment(0);
    expect(component.transcript.segments.length).toBe(initialLength - 1);
  });

  it('should not delete segment if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simulate user canceling
    const initialLength = component.transcript.segments.length;
    component.deleteSegment(0);
    expect(component.transcript.segments.length).toBe(initialLength);
  });

  it('should save transcript and call API', () => {
    mockProtocolService.sendTranscriptToBackend.and.returnValue(
      of({
        id: '123',
        title: 'Test Protocol',
        date: '2025-01-01',
        place: 'Test Place',
        numberOfAttendees: 10,
        agendaItems: [{ title: 'Test Item', explanation: 'Test Explanation' }],
      })
    );

    component.saveTranscript();

    // Check session storage is updated
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      'step3Data',
      JSON.stringify(component.transcript)
    );
    expect(mockProtocolService.sendTranscriptToBackend).toHaveBeenCalledWith(
      component.transcript
    );
    expect(mockStepper.selected.completed).toBeTrue();
    expect(mockStepper.next).toHaveBeenCalled();
  });

  it('should show error when saving transcript fails', () => {
    mockProtocolService.sendTranscriptToBackend.and.returnValue(
      throwError('Error')
    ); // Simulate error from the API

    component.saveTranscript();

    expect(mockMatSnackBar.open).toHaveBeenCalledWith(
      'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      'Schließen',
      { duration: 5000 }
    );
  });
});
