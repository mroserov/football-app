import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Competitions} from "../models/competitions";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  private readonly baseUrl = `${environment.apiUrl}competitions`;

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   *
   * @param season
   */
  getCompetitions(season: number): Observable<Competitions[]>{
    return this.httpClient.get<Competitions[]>(`${this.baseUrl}`)
      .pipe(
        map((d:any) => {
          console.log(d.competitions[0]);
          return d.competitions;
        })
      );
      /*  catchError(this.handleError)
      );(res: HttpResponse<any>) => {
        const data = res.body;
        return data;
      });*/

  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
  }
}
