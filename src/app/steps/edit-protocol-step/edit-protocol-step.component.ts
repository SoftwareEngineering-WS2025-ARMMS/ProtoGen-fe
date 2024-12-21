import { Component, OnInit } from '@angular/core';
import { Protocol } from '../../models/protocol.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

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
}
