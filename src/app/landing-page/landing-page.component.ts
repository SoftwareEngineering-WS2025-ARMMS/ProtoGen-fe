import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProtocolService } from '../services/protocol.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Protocol } from '../models/protocol.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProtocolCardComponent } from '../protocol-card/protocol-card.component';
import { ProtocolDetailComponent } from './protocol-detail/protocol-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorIntlDe } from '../utils/custom-paginator-intl-de';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatDatepickerModule,
    MatPaginatorModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlDe },
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  protocols$: Observable<Protocol[]> = of([]);

  filterPlace$ = new BehaviorSubject<string | null>(null);
  filterDateRange$ = new BehaviorSubject<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  currentPage$ = new BehaviorSubject<number>(1);

  pageSize = 3;

  filteredProtocols$: Observable<Protocol[]> | undefined;

  constructor(
    private protocolService: ProtocolService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.protocols$ = this.protocolService.getProtocols().pipe(
      catchError(() => {
        this.snackBar.open(
          'Fehler beim Laden der Protokolle Ihrer Organisation. Bitte versuchen Sie es später erneut.',
          'Schließen',
          { duration: 5000 }
        );
        return of([]);
      })
    );

    // Combine the protocols with filters and paginate using switchMap
    this.filteredProtocols$ = combineLatest([
      this.protocols$,
      this.filterPlace$,
      this.filterDateRange$,
      this.currentPage$,
    ]).pipe(
      switchMap(([protocols, place, dateRange, page]) => {
        // Apply filters
        let filtered = protocols;

        if (place) {
          filtered = filtered.filter((protocol: Protocol) =>
            protocol.place.toLowerCase().includes(place.toLowerCase())
          );
        }

        if (dateRange && dateRange.start && dateRange.end) {
          filtered = filtered.filter((protocol: Protocol) => {
            const protocolDate = new Date(protocol.date);
            return (
              protocolDate >= dateRange.start! && protocolDate <= dateRange.end!
            );
          });
        }

        if (dateRange && dateRange.start) {
          filtered = filtered.filter((protocol: Protocol) => {
            const protocolDate = new Date(protocol.date);
            return protocolDate >= dateRange.start!;
          });
        }

        if (dateRange && dateRange.end) {
          filtered = filtered.filter((protocol: Protocol) => {
            const protocolDate = new Date(protocol.date);
            return protocolDate <= dateRange.end!;
          });
        }

        // Pagination
        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;

        return of(filtered.slice(start, end)); // Return the filtered and paginated protocols
      })
    );
  }

  openProtocolDetails(protocol: Protocol): void {
    this.dialog.open(ProtocolDetailComponent, {
      data: protocol,
    });
  }

  setPlaceFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterPlace$.next(input.value);
  }

  setDateRangeFilter(start: Date | null, end: Date | null): void {
    this.filterDateRange$.next({ start, end });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPage$.next(e.pageIndex + 1);
  }
}
