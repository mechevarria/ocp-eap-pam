import { Component, OnInit } from '@angular/core';
import { LeaseService } from './lease.service';
import { Lease } from './lease';
import { Router } from '@angular/router';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  leases: Lease[];
  pageSize: number;
  currentPage: number;
  count: number;
  filter: string;
  filterIcon: IconDefinition;

  constructor(private leaseService: LeaseService, private router: Router) {
    this.leases = new Array();
    this.currentPage = 1;
    this.count = 0;
    this.pageSize = 10;
    this.filter = '';
    this.filterIcon = faSearch;
  }

  showDetail(id: number): void {
    this.router.navigate(['/home/detail'], { queryParams: { id: id } });
  }

  load(): void {
    const offset = (this.currentPage - 1) * this.pageSize;

    this.leaseService.search(offset, this.pageSize, this.filter).subscribe(res => {
      this.leases = res.leases;
      this.count = res.count;
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.load();
  }

  getClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'badge-success';
      case 'Rejected':
        return 'badge-danger';
      case 'AutoApproved':
        return 'badge-info';
      case 'Submitted':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

  ngOnInit() {
    this.load();
  }
}
