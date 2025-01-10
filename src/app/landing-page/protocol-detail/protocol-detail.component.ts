import { Component, Inject } from '@angular/core';
import { Protocol } from '../../models/protocol.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { DatePipe, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { exportToPDF } from '../../utils/pdf-exporter';

@Component({
  selector: 'app-protocol-detail',
  imports: [
    NgFor,
    MatIcon,
    MatIconButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatTooltip,
    DatePipe,
  ],
  templateUrl: './protocol-detail.component.html',
  styleUrl: './protocol-detail.component.scss',
})
export class ProtocolDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public protocol: Protocol) {}

  exportToPDF() {
    exportToPDF(this.protocol);
  }
}
