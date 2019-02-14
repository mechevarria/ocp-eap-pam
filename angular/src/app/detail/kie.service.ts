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
const baseUrl = '/services/rest';
const processId = 'RestCall.RestCall';
const containerId = 'RestCall_1.0.0';

@Injectable({
  providedIn: 'root'
})
export class KieService {

  constructor(private messageService: MessageService, private http: HttpClient) {}

  process(id: number, annualRent: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/processes/${processId}/instances`;

    const body = {
      id: id,
      annualRent: annualRent
    };
    return this.http.post<any>(url, body, httpOptions).pipe(
      catchError(res => {
        return this.handleError('process()', res);
      })
    );
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
