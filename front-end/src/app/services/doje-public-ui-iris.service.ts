import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class DOJEIRISService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`DoJE Service: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // It appears unnecessary to create http options / headers
  // for ths application, but included for completeness of solution
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'responseType': 'json'})
  };

  saveRequest(foiRequest: any):Observable<any> {

    const headers = new HttpHeaders()
    let url = 'http://localhost:9092/doje/api2/FOIRequest'
    return this.http.post<any>(url, foiRequest,this.httpOptions)
    .pipe(
      tap((newrequest: any) => this.log(`Thank you. Your application ID is SN1492-${newrequest.ID}`)),
      catchError(this.handleError<any>('saverequest')))
  }
}