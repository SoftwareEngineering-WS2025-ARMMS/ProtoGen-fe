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
  tagesordnungspunkte: AgendaItem[];
}
