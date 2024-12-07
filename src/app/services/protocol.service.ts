import { Injectable } from '@angular/core';
import { Protocol } from '../models/protocol.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  private protocols: Protocol[] = [
    {
      id: '1',
      title: 'Monatliches Team-Meeting',
      date: '2024-12-01',
      place: 'Konferenzraum A',
      numberOfAttendees: 12,
      tagesordnungspunkte: [
        {
          title: 'Projekt-Updates',
          explanation: 'Aktualisierungen zu laufenden Projekten.',
        },
        {
          title: 'Budget-Diskussion',
          explanation: 'Überprüfung des vierteljährlichen Budgets.',
        },
        {
          title: 'Nächste Schritte',
          explanation: 'Planung der Roadmap für das nächste Quartal.',
        },
      ],
    },
    {
      id: '2',
      title: 'Jahreshauptversammlung',
      date: '2024-12-15',
      place: 'Haupt-Auditorium',
      numberOfAttendees: 50,
      tagesordnungspunkte: [
        {
          title: 'Vorstandswahlen',
          explanation: 'Wahl der neuen Vorstandsmitglieder.',
        },
        {
          title: 'Finanzbericht',
          explanation: 'Überblick über die jährliche Finanzperformance.',
        },
        {
          title: 'Vision 2025',
          explanation:
            'Festlegung von Zielen und Strategien für das nächste Jahr.',
        },
      ],
    },
  ];

  getProtocols(): Observable<Protocol[]> {
    return of(this.protocols);
  }

  getProtocolById(id: string): Protocol | undefined {
    return this.protocols.find((protocol) => protocol.id === id);
  }
}
