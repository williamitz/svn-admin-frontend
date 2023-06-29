import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPager } from 'src/app/interfaces/pager.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() paginate: IPager = {
    currentPage: 1,
    endPage: 1,
    pages: [1],
    startPage: 1,
    totalPages: 1
  };

  @Input() total!: number;

  @Output() navigate = new EventEmitter<number>();

  get pages() { return this.paginate.pages; }
  get currentPage() { return this.paginate.currentPage; }
  get startPage() { return this.paginate.startPage; }
  get endPage() { return this.paginate.endPage; }

  get startRecord() {
    const current = this.currentPage;
    return ((current - 1) * 5) + 1;
  }
  get endRecord() {
    const current = this.currentPage;
    const aux = current * 5;
    return aux > this.total ? this.total : aux;
   }

  onPaginate( page: number ) {
    this.navigate.emit( page );
  }

  onNextPage() {
    this.navigate.emit( this.currentPage + 1 );
  }
  onPrevPage() {
    this.navigate.emit( this.currentPage - 1 );
  }

}
