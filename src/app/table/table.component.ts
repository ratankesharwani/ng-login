import {AsyncPipe, CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {FormsModule} from '@angular/forms';
import {NgbHighlight, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CountryService} from '../service/country.service';
import {NgbdSortableHeader} from '../dirctives/sortable.directive';
import {QueryParams} from '../data/query-params';

@Component({
  selector: 'app-table',
  imports: [FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  countries$: Observable<any[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input() tableHeader: any[] = [];
  @Input() tableData: any;
  @Input() queryParams: QueryParams;
  @Input() isLoading: boolean = false;
  @Output() onSortEvent = new EventEmitter();

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onPageChange(newPage: number): void {
    this.queryParams = new QueryParams(
      this.queryParams.filters,
      newPage,
      this.queryParams.size,
      this.queryParams.totalElements,
      this.queryParams.sortBy,
      this.queryParams.direction
    );
    this.onSortEvent.emit(this.queryParams);
  }

  onPageSizeChange(newSize: number): void {
    this.queryParams = new QueryParams(
      this.queryParams.filters,
      0,
      newSize,
      this.queryParams.totalElements,
      this.queryParams.sortBy,
      this.queryParams.direction
    );

    this.onSortEvent.emit(this.queryParams);
  }

  onSort(column: string): void {
    if (this.queryParams.sortBy !== column) {
      this.queryParams.sortBy = column;
      this.queryParams.direction = 'asc';
    } else {
      this.queryParams.direction =
        this.queryParams.direction === 'asc' ? 'desc' :
          this.queryParams.direction === 'desc' ? '' : 'asc';
    }

    this.headers.forEach(header => {
      header.direction = header.sortable === this.queryParams.sortBy ? this.queryParams.direction : '';
    });

    this.queryParams = new QueryParams(
      this.queryParams.filters,
      0,
      this.queryParams.size,
      this.queryParams.totalElements,
      this.queryParams.sortBy,
      this.queryParams.direction || 'asc'
    );
    this.onSortEvent.emit(this.queryParams);
  }

  onFilterChange(): void {
    this.queryParams.page = 0; // reset to first page on new filter
    this.onSortEvent.emit(this.queryParams);
  }
}
