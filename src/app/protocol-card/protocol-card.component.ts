import { Component, Input } from '@angular/core';
import { Protocol } from '../models/protocol.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-protocol-card',
  imports: [MatCardModule, CommonModule, MatIconModule, MatDividerModule],
  templateUrl: './protocol-card.component.html',
  styleUrl: './protocol-card.component.scss',
})
export class ProtocolCardComponent {
  @Input() protocol!: Protocol;
}
