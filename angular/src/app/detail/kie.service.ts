import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs/index';

const headers: HttpHeaders = new HttpHeaders()
.append('Content-Type', 'application/json')
.append('Authorization', 'Basic ' + btoa('pamAdmin:redhatpam1!'));

const httpOptions = {
  headers: headers
};

@Injectable({
  providedIn: 'root'
})
export class KieService {
  private url = '/services/rest/server/containers/RestCall_1.0.0/processes/RestCall.RestCall/instances';

  constructor(private messageService: MessageService, private http: HttpClient) {}

  process(id: number, annualRent: number): Observable<any> {
    const body = {
      id: id,
      annualRent: annualRent
    };
    return this.http.post<any>(this.url, body, httpOptions).pipe(
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
