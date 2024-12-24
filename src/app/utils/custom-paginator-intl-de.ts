import { MatPaginatorIntl } from '@angular/material/paginator';

export class MatPaginatorIntlDe extends MatPaginatorIntl {
  override firstPageLabel = 'Erste Seite';
  override lastPageLabel = 'Letzte Seite';
  override itemsPerPageLabel = 'Einträge pro Seite';
  override nextPageLabel = 'Nächste Seite';
  override previousPageLabel = 'Vorherige Seite';

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) {
      return `0 von ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} von ${length}`;
  };
}
