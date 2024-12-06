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
      title: 'Monthly Team Meeting',
      date: '2024-12-01',
      place: 'Conference Room A',
      numberOfAttendees: 12,
      tagesordnungspunkte: [
        {
          title: 'Project Updates',
          explanation: 'Updates on ongoing projects.',
        },
        {
          title: 'Budget Discussion',
          explanation: 'Review of the quarterly budget.',
        },
        {
          title: 'Next Steps',
          explanation: 'Planning the roadmap for the next quarter.',
        },
      ],
    },
    {
      id: '2',
      title: 'Annual General Meeting',
      date: '2024-11-15',
      place: 'Main Auditorium',
      numberOfAttendees: 50,
      tagesordnungspunkte: [
        {
          title: 'Board Elections',
          explanation: 'Electing the new board members.',
        },
        {
          title: 'Financial Report',
          explanation: 'Overview of the annual financial performance.',
        },
        {
          title: 'Vision 2025',
          explanation: 'Setting goals and strategies for the next year.',
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
