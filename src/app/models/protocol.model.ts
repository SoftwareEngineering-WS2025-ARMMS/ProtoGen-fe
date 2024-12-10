export interface AgendaItem {
  title: string;
  explanation: string;
}

export interface Protocol {
  id: string;
  title: string;
  date: string;
  place: string;
  numberOfAttendees: number;
  agendaItems: AgendaItem[];
}

export type Annotations = Record<string, string>;

export interface Transcript {
  segments: Segment[];
}

interface Segment {
  speaker: string;
  text: string;
}
