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

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private leaseService: LeaseService, private messageService: MessageService, private kieService: KieService) {
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
      this.messageService.success(`Process instance id is ${res}`);
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
