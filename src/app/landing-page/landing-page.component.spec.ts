import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Protocol } from '../models/protocol.model';
import { ProtocolService } from '../services/protocol.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let protocolServiceMock: jasmine.SpyObj<ProtocolService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  const mockProtocols: Protocol[] = [
    {
      id: '1',
      title: 'Quarterly Meeting',
      date: '2023-01-01',
      place: 'Berlin',
      numberOfAttendees: 10,
      agendaItems: [
        { title: 'Budget Review', explanation: 'Discuss budget for Q1' },
        { title: 'Team Updates', explanation: 'Updates from all teams' },
      ],
    },
    {
      id: '2',
      title: 'Annual Strategy Session',
      date: '2023-06-15',
      place: 'Munich',
      numberOfAttendees: 25,
      agendaItems: [
        { title: 'Goal Setting', explanation: 'Set goals for the year' },
      ],
    },
  ];

  beforeEach(async () => {
    protocolServiceMock = jasmine.createSpyObj('ProtocolService', [
      'getProtocols',
    ]);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    protocolServiceMock.getProtocols.and.returnValue(of(mockProtocols));

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        { provide: ProtocolService, useValue: protocolServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call protocolService.getProtocols on init', () => {
    expect(protocolServiceMock.getProtocols).toHaveBeenCalled();
  });

  it('should populate protocols$ on init', (done) => {
    component.protocols$.subscribe((protocols) => {
      expect(protocols.length).toBe(2);
      expect(protocols[0].title).toBe('Quarterly Meeting');
      expect(protocols[1].place).toBe('Munich');
      done();
    });
  });

  it('should filter protocols by place', (done) => {
    component.setPlaceFilter({
      target: { value: 'Berlin' },
    } as unknown as Event);
    component.filteredProtocols$?.subscribe((filtered) => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].place).toBe('Berlin');
      done();
    });
  });

  it('should filter protocols by date range', (done) => {
    component.setDateRangeFilter(new Date(2022, 12, 1), new Date(2023, 1, 1));
    component.filteredProtocols$?.subscribe((filtered) => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Quarterly Meeting');
      done();
    });
  });

  it('should paginate protocols correctly', (done) => {
    component.pageSize = 1;
    component.currentPage$.next(1);

    component.filteredProtocols$?.subscribe((filtered) => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Quarterly Meeting');
      done();
    });
  });

  it('should open protocol details dialog', () => {
    const protocol = mockProtocols[0];
    component.openProtocolDetails(protocol);

    expect(dialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: protocol,
    });
  });
});
