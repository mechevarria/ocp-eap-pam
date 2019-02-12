import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Lease } from './lease';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs/index';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private url = '/jboss-api/lease';

  constructor(private messageService: MessageService, private http: HttpClient) {}

  getAll(offset: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.url, {
      headers: httpOptions.headers,
      params: {
        offset: offset.toString(),
        pageSize: pageSize.toString()
      }
    }).pipe(
      catchError(res => {
        return this.handleError('getAll()', res);
      })
    );
  }

  get(id: number): Observable<Lease> {
    return this.http.get<Lease>(this.url + `/${id}`, httpOptions).pipe(
      catchError(res => {
        return this.handleError(`get(${id})`, res);
      })
    );
  }

  update(newLease: Lease): Observable<Lease> {
    return this.http.put<Lease>(this.url, newLease, httpOptions).pipe(
      catchError(res => {
        return this.handleError('update()', res);
      })
    );
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
