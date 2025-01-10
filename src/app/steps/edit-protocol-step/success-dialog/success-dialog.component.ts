import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Protocol } from '../../../models/protocol.model';
import { MatButton } from '@angular/material/button';
import { getPDFBlob } from '../../../utils/pdf-exporter';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-success-dialog',
  imports: [MatButton, MatDialogActions],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
})
export class SuccessDialogComponent {
  protocol: Protocol;
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  constructor(
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { protocol: Protocol }
  ) {
    this.protocol = data.protocol;
  }

  exportToDropbox(): void {
    console.log('Exporting to Dropbox...');
    const pdfBlob = getPDFBlob(this.protocol);
    const formData = new FormData();
    formData.append('file', pdfBlob, `Protokoll_${this.protocol.date}.pdf`);

    this.http
      .post(`${environment.dropboxUrl}/upload_file/`, formData)
      .subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.snackBar.open(
            'Datei erfolgreich zu Dropbox hochgeladen!',
            'Close',
            {
              duration: 3000,
            }
          );
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.snackBar.open(
            'Fehler beim Hochladen der Datei in Dropbox. Bitte versuchen Sie es später eneut.',
            'Close',
            {
              duration: 3000,
            }
          );
        },
      });
  }

  returnToHomepage(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
