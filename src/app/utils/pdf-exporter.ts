import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Protocol } from '../models/protocol.model';
import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('de-DE');

export function exportToPDF(protocol: Protocol) {
  buildPDF(protocol).save(`Protokoll_${protocol.date}.pdf`);
}

export function getPDFBlob(protocol: Protocol): Blob {
  const pdfBlob = buildPDF(protocol).output('blob');
  return pdfBlob;
}

function buildPDF(protocol: Protocol): jsPDF {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`Protokoll ${protocol.title}`, 15, 10);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const formattedDate =
    datePipe.transform(protocol.date, 'dd-MM-yyyy') || protocol.date;
  doc.text(`Datum: ${formattedDate}`, 15, 20);
  doc.text(`Ort: ${protocol.place}`, 15, 25);
  doc.text(`Anwesende: ${protocol.numberOfAttendees}`, 15, 30);

  doc.text('Die Tagesordnungspunkte sind:', 15, 45);

  let yPosition = 50;
  const agendaData = protocol.agendaItems.map((item, index) => ({
    content: `${index + 1}. ${item.title}`,
  }));

  // Use autoTable to handle text wrapping and page breaks for agenda items
  autoTable(doc, {
    theme: 'plain',
    startY: yPosition,
    head: [],
    body: agendaData.map((item) => [item.content]),
    margin: { left: 15, right: 15 },
    columnStyles: {
      0: { cellWidth: 'auto' },
    },
    styles: {
      cellPadding: 2,
      fontSize: 10,
      valign: 'top',
      overflow: 'linebreak',
      font: 'helvetica',
    },
  });
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  yPosition = (doc as any).lastAutoTable.finalY + 10;

  const explanationData = protocol.agendaItems.map((item, index) => ({
    content: `${index + 1}. ${item.explanation}`,
  }));

  autoTable(doc, {
    theme: 'plain',
    startY: yPosition,
    head: [],
    body: explanationData.map((item) => [item.content]),
    margin: { left: 25, right: 15 },
    columnStyles: {
      0: { cellWidth: 'auto' },
    },
    styles: {
      cellPadding: 2,
      fontSize: 10,
      valign: 'top',
      overflow: 'linebreak',
      font: 'helvetica',
    },
  });
  return doc;
}
