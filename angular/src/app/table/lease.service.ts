import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Lease } from "./lease";
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {Observable, of} from 'rxjs/index';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private url = '/jboss-api/lease';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getAll(): Observable<Lease[]> {
    return this.http.get<Lease[]>(this.url)
      .pipe(
        catchError(error => {
          this.messageService.error(`getAll() ${error.message}`);
          return of(null);
        })
      );
  }

}
