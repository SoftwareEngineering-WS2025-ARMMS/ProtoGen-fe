import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProtocolService } from '../services/protocol.service';
import { Observable } from 'rxjs';
import { Protocol } from '../models/protocol.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProtocolCardComponent } from '../protocol-card/protocol-card.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ProtocolCardComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  protocols$!: Observable<Protocol[]>;

  constructor(private protocolService: ProtocolService) {}

  ngOnInit(): void {
    this.protocols$ = this.protocolService.getProtocols();
  }
}
