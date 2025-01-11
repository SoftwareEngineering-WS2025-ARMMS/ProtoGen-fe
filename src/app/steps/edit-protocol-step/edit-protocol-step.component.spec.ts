import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocolStepComponent } from './edit-protocol-step.component';
import { ProtocolService } from '../../services/protocol.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

describe('EditProtocolStepComponent', () => {
  let component: EditProtocolStepComponent;
  let fixture: ComponentFixture<EditProtocolStepComponent>;
  let mockProtocolService: jasmine.SpyObj<ProtocolService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => {
      if (key === 'step4Data') {
        return JSON.stringify({
          id: '123',
          title: 'Test Protocol',
          date: '2025-01-01',
          place: 'Test Place',
          numberOfAttendees: 10,
          agendaItems: [
            { title: 'Test Item', explanation: 'Test Explanation' },
          ],
        });
      }
      return null;
    });
    spyOn(window.sessionStorage, 'setItem').and.callThrough();

    mockProtocolService = jasmine.createSpyObj('ProtocolService', [
      'saveProtocolToBackend',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [EditProtocolStepComponent],
      providers: [
        { provide: ProtocolService, useValue: mockProtocolService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProtocolStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load protocol from sessionStorage on ngOnInit', () => {
    expect(component.protocol).toBeTruthy();
    expect(component.protocol.id).toBe('123');
  });

  it('should delete agenda item when confirmation is given', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simulate user confirming
    const initialLength = component.protocol.agendaItems.length;
    component.deleteAgendaItem(0);
    expect(component.protocol.agendaItems.length).toBe(initialLength - 1);
  });

  it('should not delete agenda item if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simulate user canceling
    const initialLength = component.protocol.agendaItems.length;
    component.deleteAgendaItem(0);
    expect(component.protocol.agendaItems.length).toBe(initialLength);
  });

  it('should add new agenda item', () => {
    const initialLength = component.protocol.agendaItems.length;
    component.addAgendaItem();
    expect(component.protocol.agendaItems.length).toBe(initialLength + 1);
  });

  it('should save protocol and open success dialog', () => {
    mockProtocolService.saveProtocolToBackend.and.returnValue(of({})); // Simulate successful save
    component.saveProtocol();
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      'step4Data',
      JSON.stringify(component.protocol)
    );
    expect(mockProtocolService.saveProtocolToBackend).toHaveBeenCalledWith(
      component.protocol
    );
    expect(mockMatDialog.open).toHaveBeenCalledWith(SuccessDialogComponent, {
      data: { protocol: component.protocol },
    });
  });

  it('should show error when saving protocol fails', () => {
    mockProtocolService.saveProtocolToBackend.and.returnValue(
      throwError('Error')
    ); // Simulate an error
    component.saveProtocol();
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(
      'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      'Schließen',
      { duration: 5000 }
    );
  });
});
