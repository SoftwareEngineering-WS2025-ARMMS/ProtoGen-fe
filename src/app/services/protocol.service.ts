import { Injectable } from '@angular/core';
import { Annotations, Protocol, Transcript } from '../models/protocol.model';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  private url = '/api/annotate';

  constructor(private http: HttpClient) {}

  private protocols: Protocol[] = [
    {
      id: '1',
      title: 'Monatliches Team-Meeting',
      date: '2024-12-01',
      place: 'Konferenzraum A',
      numberOfAttendees: 12,
      agendaItems: [
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
      agendaItems: [
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

  sendAnnotations(annotations: Annotations): Observable<Transcript> {
    return this.http.post<Transcript>(this.url, annotations);
  }

  sendAnnotationsMocked(annotations: Annotations): Observable<Transcript> {
    this.http.post<Transcript>(this.url, annotations);
    const mockResponse: Transcript = {
      segments: [
        {
          speaker: 'Adrian',
          text: 'Willkommen zu unserem heutigen Treffen! Wir haben viel zu besprechen, also lasst uns direkt anfangen.',
        },
        {
          speaker: 'Jenny',
          text: 'Danke, dass ihr alle gekommen seid. Ich wollte mit euch über die Planung des Sommerfestes sprechen.',
        },
        {
          speaker: 'Julia',
          text: 'Ja, das ist ein wichtiges Thema. Wir müssen noch entscheiden, wer sich um die Sponsoren kümmert.',
        },
        {
          speaker: 'Adrian',
          text: 'Ja genau, und wir sollten auch überlegen, welche Aktivitäten wir anbieten wollen.',
        },
        {
          speaker: 'Jenny',
          text: 'Ich denke, ein kleines Konzert wäre eine tolle Idee. Vielleicht könnten wir lokale Bands einladen?',
        },
        {
          speaker: 'Julia',
          text: 'Das klingt super! Aber wir müssen sicherstellen, dass das Budget dafür ausreicht.',
        },
        {
          speaker: 'Adrian',
          text: 'Ich kann mich um das Budget kümmern. Wir sollten außerdem jemanden finden, der das Catering organisiert.',
        },
        {
          speaker: 'Jenny',
          text: 'Ich kenne jemanden, der bei einem lokalen Restaurant arbeitet. Ich kann ihn fragen, ob sie Interesse haben.',
        },
        {
          speaker: 'Julia',
          text: 'Perfekt, dann bleibt nur noch die Werbung. Wir brauchen Flyer, Social-Media-Posts und vielleicht ein paar Plakate.',
        },
        {
          speaker: 'Adrian',
          text: 'Okay, ich werde das alles zusammenfassen und die Aufgaben verteilen. Gibt es sonst noch etwas, was wir berücksichtigen müssen?',
        },
        {
          speaker: 'Jenny',
          text: 'Vielleicht ein Plan B für schlechtes Wetter? Ein Zelt oder eine Halle als Backup wäre gut.',
        },
        {
          speaker: 'Julia',
          text: 'Gute Idee! Wir sollten uns nach einer Halle in der Nähe erkundigen. Ich übernehme das.',
        },
        {
          speaker: 'Adrian',
          text: 'Das klingt nach einem Plan. Vielen Dank an alle. Wir schaffen das!',
        },
      ],
    };

    return of(mockResponse).pipe(delay(2000));
  }

  sendTranscriptToBackend(transcript: Transcript): Observable<Protocol> {
    return this.http.post<Protocol>('/api/transcript', transcript);
  }

  sendTranscriptToBackendmocked(transcript: Transcript): Observable<Protocol> {
    this.http.post<Transcript>(this.url, transcript);
    // Mocked backend response
    const mockProtocol: Protocol = {
      id: '12345',
      title: 'Sommerfest Planung',
      date: new Date().toISOString().split('T')[0],
      place: 'München',
      numberOfAttendees: 7,
      agendaItems: [
        {
          title: 'Begrüßung',
          explanation: 'Willkommen und Vorstellung der Tagesordnung',
        },
        {
          title: 'Budgetplanung',
          explanation: 'Diskussion über die verfügbaren Mittel',
        },
        {
          title: 'Aktivitäten',
          explanation: 'Planung der geplanten Events und Unterhaltung',
        },
      ],
    };

    return of(mockProtocol).pipe(delay(4000)); // Simulates backend delay
  }
}
