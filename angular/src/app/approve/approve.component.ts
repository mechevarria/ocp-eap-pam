import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KieService } from '../detail/kie.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  task: any;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private kieService: KieService, private messageService: MessageService, private router: Router) {
    this.task = {};
  }

  load(taskId: number): void {
    this.kieService.getTask(taskId).subscribe(res => {
      this.task = res;
    });
  }

  approve(): void {
    this.kieService.complete(this.task['task-id'], 'Approved').subscribe(() => {
      this.messageService.info('Lease Approved');
      this.router.navigate(['/home/task']);
    });
  }

  reject(): void {
    this.kieService.complete(this.task['task-id'], 'Rejected').subscribe(() => {
      this.messageService.info('Lease Rejected');
      this.router.navigate(['/home/task']);
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
