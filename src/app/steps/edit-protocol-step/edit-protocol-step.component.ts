import { Component, OnInit } from '@angular/core';
import { Protocol } from '../../models/protocol.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-protocol-step',
  imports: [FormsModule, NgFor, NgIf],
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

  saveProtocol() {
    sessionStorage.setItem('step4Data', JSON.stringify(this.protocol));
    console.log('Protocol updated and saved:', this.protocol);
  }
}
