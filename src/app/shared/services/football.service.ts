import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Competition} from "../models/competition";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Team} from "../models/team";
import {Player} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  private readonly baseUrl = `${environment.apiUrl}competitions`;

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Get all competitions
   */
  getCompetitions(): Observable<Competition[]> {
    return this.httpClient.get<Competition[]>(`${environment.apiUrl}competitions`)
      .pipe(
        map((d: any) => {
          return d.competitions;
        })
      );
  }

  /**
   * Get competitions by season
   * TODO: With the free token it is not possible to consume the Api with date filters.
   * @param season
   */
  getCompetitionsBySeason(season: number): Observable<Competition[]> {
    const dateFrom = `${season}-01-01`;
    const dateTo = `${season}-01-01`;
    return this.httpClient
      .get<Competition[]>(`${environment.apiUrl}competitions?dateFrom=${dateFrom}&dateTo=${dateTo}`)
      .pipe(
        map((d: any) => {
          return d.competitions;
        })
      );
  }

  getTeamsByCompetition(competitionId: number) {
    return this.httpClient.get<Team[]>(`${environment.apiUrl}competitions\\${competitionId}\\teams`)
      .pipe(
        map((d: any) => {
          return d.teams;
        })
      );
  }

  getPlayersByTeam(teamId: number) {
    return this.httpClient.get<Player[]>(`${environment.apiUrl}teams\\${teamId}`)
      .pipe(
        map((d: any) => {
          d.squad.map((s: Player) => {
            s.team = d.name;
          })
          return d.squad;
        })
      );
  }
}
