import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Protocol } from '../../../models/protocol.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  imports: [MatButton, MatDialogActions],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
})
export class SuccessDialogComponent {
  protocol: Protocol;

  constructor(
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { protocol: Protocol }
  ) {
    this.protocol = data.protocol;
  }

  exportToDropbox(): void {
    console.log('Exporting to Dropbox...');
  }

  returnToHomepage(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
