import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs/index';

const headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', 'Basic ' + btoa('pamAdmin:redhatpam1!'));

const httpOptions = {
  headers: headers
};
const baseUrl = '/services/rest';
const processId = 'approval';
const containerId = 'lease_1.0.0';

@Injectable({
  providedIn: 'root'
})
export class KieService {
  constructor(private messageService: MessageService, private http: HttpClient) {}

  getDecision(annualRent: number): Observable<any> {
    const url = `/rules/services/rest/server/containers/instances/itorders`;

    const options = {
      headers: httpOptions.headers,
      params: {
        'user_key': 'eac46b7e4ab9139ae0b574d58975e77d'
      }
    };

    const body = {
      lookup: 'itsession',
      commands: [
        {
          insert: {
            object: {
              'org.jbpm.demo.Lease': { leaseAgreementAmount: annualRent }
            },
            'out-identifier': 'lease',
            'return-object': true
          }
        },
        {
          'fire-all-rules': {}
        }
      ]
    };

    return this.http.post<any>(url, body, options).pipe(
      catchError(res => {
        return this.handleError('getDecision()', res);
      })
    );
  }

  process(id: number, annualRent: number, isAutoApproved: boolean): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/processes/${processId}/instances`;

    const body = {
      id: id,
      annualRent: annualRent,
      isAutoApproved: isAutoApproved
    };
    return this.http.post<any>(url, body, httpOptions).pipe(
      catchError(res => {
        return this.handleError('process()', res);
      })
    );
  }

  getTasks(): Observable<any> {
    const url = `${baseUrl}/server/queries/tasks/instances/pot-owners`;
    return this.http.get<any>(url, httpOptions).pipe(
      catchError(res => {
        return this.handleError('getTasks()', res);
      })
    );
  }

  getTask(taskId: number): Observable<any> {
    const url = `${baseUrl}/server/queries/tasks/instances/${taskId}`;
    return this.http.get<any>(url, httpOptions).pipe(
      catchError(res => {
        return this.handleError('getTask()', res);
      })
    );
  }

  claim(taskId: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskId}/states/claimed`;
    return this.http.put<any>(url, null, httpOptions).pipe(
      catchError(res => {
        return this.handleError('claim()', res);
      })
    );
  }

  start(taskId: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskId}/states/started`;
    return this.http.put<any>(url, null, httpOptions).pipe(
      catchError(res => {
        return this.handleError('start()', res);
      })
    );
  }

  complete(taskId: number, status: string): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskId}/states/completed`;
    const body = {
      updatedstatus: status
    };

    return this.http.put<any>(url, body, httpOptions).pipe(
      catchError(res => {
        return this.handleError('complete()', res);
      })
    );
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
