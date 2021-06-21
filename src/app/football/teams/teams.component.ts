import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FootballService} from "../../shared/services/football.service";
import {Team} from "../../shared/models/team";
import {ActivatedRoute} from "@angular/router";
import {SubSink} from 'subsink'
import {MatSnackBar} from "@angular/material/snack-bar";
import {FootballConstants} from "../football.constants";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements AfterViewInit {

  /**
   * Columns to show in table
   */
  displayedColumns: string[] = ['crestUrl', 'name', 'area.name', 'venue', 'players'];

  /**
   * Table Datasource
   */
  dataSource = new MatTableDataSource<Team>()

  /**
   * Teams Model
   */
  teams: Team[] = [];

  /**
   * Subsink to manage subscribe
   */
  private sub = new SubSink();

  /**
   * Competition Id
   */
  private competitionId!: number;

  /**
   * Material sort
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Material paginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private footballService: FootballService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) {
    this.sub.sink = this.route.params.subscribe(params => {
      this.competitionId = +params['id'];
      this.route.data.subscribe(data => {
        data['params'] = this.competitionId
      });
      this.getTeamsByCompetition(this.competitionId);
    });
  }

  /**
   * set sort and paginator to table
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Filter in competitions table
   * @param $event
   */
  doFilter($event: any): void {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  /**
   * Get teams by competition
   * @param id Competition Id
   */
  private getTeamsByCompetition(id: number) {
    this.footballService.getTeamsByCompetition(id).subscribe((data) => {
      this.dataSource.data = data;
    }, err => {
      // @ts-ignore
      this._snackBar.open(FootballConstants[err.error.errorCode], 'Close', {duration: 5000});
    });
  }
}
