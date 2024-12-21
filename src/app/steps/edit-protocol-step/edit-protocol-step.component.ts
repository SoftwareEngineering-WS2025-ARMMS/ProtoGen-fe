import { Component, OnInit } from '@angular/core';
import { Protocol } from '../../models/protocol.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-edit-protocol-step',
  imports: [FormsModule, NgFor, NgIf, MatIconButton, MatTooltipModule],
  templateUrl: './edit-protocol-step.component.html',
  styleUrl: './edit-protocol-step.component.scss',
})
export class EditProtocolStepComponent implements OnInit {
  protocol!: Protocol;

  ngOnInit() {
    const storedProtocol = sessionStorage.getItem('step4Data');
    if (storedProtocol) {
      this.protocol = JSON.parse(storedProtocol);
    }
  }

  deleteAgendaItem(index: number) {
    const confirmation = confirm(
      `Möchten Sie den Tagesordnungspunkt "${this.protocol.agendaItems[index].title}" wirklich löschen?`
    );
    if (confirmation) {
      this.protocol.agendaItems.splice(index, 1);
    }
  }

  addAgendaItem() {
    this.protocol.agendaItems.push({
      title: '',
      explanation: '',
    });
  }

  saveProtocol() {
    sessionStorage.setItem('step4Data', JSON.stringify(this.protocol));
    console.log('Protocol updated and saved:', this.protocol);
  }

  exportToPDF() {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Protokoll ${this.protocol.title}`, 15, 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    doc.text(`Datum: ${this.protocol.date}`, 15, 20);
    doc.text(`Ort: ${this.protocol.place}`, 15, 25);
    doc.text(`Anwesende: ${this.protocol.numberOfAttendees}`, 15, 30);

    doc.text('Die Tagesordnungspunkte sind:', 15, 45);

    let yPosition = 50;
    const agendaData = this.protocol.agendaItems.map((item, index) => ({
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

    const explanationData = this.protocol.agendaItems.map((item, index) => ({
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

    doc.save(`Protokoll_${this.protocol.date}.pdf`);
  }
}
