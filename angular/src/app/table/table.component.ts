import { Component, OnInit } from '@angular/core';
import { LeaseService } from './lease.service';
import { Lease } from './lease';
import { Router } from '@angular/router';

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

  constructor(private leaseService: LeaseService, private router: Router) {
    this.leases = new Array();
    this.currentPage = 1;
    this.count = 0;
    this.pageSize = 10;
  }

  showDetail(id: number): void {
    this.router.navigate(['/home/detail'], { queryParams: { id: id } });
  }

  load(): void {
    const offset = (this.currentPage - 1) * this.pageSize;

    this.leaseService.getAll(offset, this.pageSize, true).subscribe(res => {
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
      case 'Submitted':
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  }

  ngOnInit() {
    this.load();
  }
}
