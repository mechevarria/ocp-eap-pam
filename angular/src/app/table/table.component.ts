import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../message/message.service';
import { LeaseService } from './lease.service';
import { Lease } from './lease';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { IconDefinition, faSync, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings;
  leases: Lease[];
  dtTrigger: Subject<any>;
  loadIcon: IconDefinition;
  clearIcon: IconDefinition;
  isLoading: boolean;

  constructor(private messageService: MessageService, private leaseService: LeaseService) {
    this.dtOptions = {};
    this.leases = new Array();
    this.dtTrigger = new Subject();
    this.loadIcon = faSync;
    this.clearIcon = faTrashAlt;
    this.isLoading = false;
  }

  load(): void {
    this.isLoading = true;
    this.leaseService.getAll().subscribe(res => {
      this.leases = res;
      this.rerender();

      if (this.leases != null) {
        this.messageService.success(`Successfully loaded ${this.leases.length} leases from service`);
      }
      this.isLoading = false;
    });
  }

  rerender(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();

        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }

  clear(): void {
    this.leases = [];
    this.isLoading = true;
    this.rerender();
    this.messageService.info('Cleared data');
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple',
      responsive: true,
      pageLength: 100
    };
  }

  ngAfterViewInit() {
    this.rerender();
  }
}
