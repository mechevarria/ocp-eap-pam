import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaseService } from '../table/lease.service';
import { Lease } from '../table/lease';
import { MessageService } from '../message/message.service';
import { KieService } from './kie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  lease: Lease;

  constructor(
    private route: ActivatedRoute,
    private leaseService: LeaseService,
    private messageService: MessageService,
    private kieService: KieService
  ) {
    this.lease = null;
  }

  update(): void {
    this.leaseService.update(this.lease).subscribe(res => {
      this.lease = res;
      if (this.lease != null) {
        this.messageService.success(`Updated lease ${this.lease.id}`);
      }
    });
  }

  process(): void {
    this.kieService.process(this.lease.id, this.lease.annualRent).subscribe(res => {
      if (res != null) {
        this.messageService.success(`Process started with id ${res}`);
        this.lease.processInstanceId = res;
        this.lease.status = 'Submitted';
        this.update();
      }
    });
  }

  load(id: number): void {
    this.leaseService.get(id).subscribe(res => {
      this.lease = res;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(routeParams => {
      if (routeParams.id) {
        this.load(routeParams.id);
      }
    });
  }
}
