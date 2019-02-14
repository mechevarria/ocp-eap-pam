import { Component, OnInit } from '@angular/core';
import { KieService } from '../detail/kie.service';
import { Task } from './task';
import { MessageService } from '../message/message.service';
import { load } from '@angular/core/src/render3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  constructor(private kieService: KieService, private messageService: MessageService, private router: Router) {}

  claim(taskId: number): void {
    this.kieService.claim(taskId).subscribe(res => {
      this.messageService.info(`Task ${taskId} claimed`);
      this.load();
    });
  }

  start(taskId: number): void {
    this.kieService.start(taskId).subscribe(res => {
      this.messageService.info(`Task ${taskId} started`);
      this.go(taskId);
    });
  }

  go(taskId: number): void {
    this.router.navigate(['/home/approve'], { queryParams: { id: taskId } });
  }

  load(): void {
    this.kieService.getTasks().subscribe(res => {
      this.tasks = new Array();

      res['task-summary'].forEach(item => {
        const task: Task = new Task();
        task.id = item['task-id'];
        task.name = item['task-name'];
        task.status = item['task-status'];
        task.processId = item['task-proc-inst-id'];
        task.created = new Date(item['task-created-on']['java.util.Date']);
        this.tasks.push(task);
      });
    });
  }

  ngOnInit() {
    this.load();
  }
}
