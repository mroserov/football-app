import {Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {FootballService} from '../../shared/services/football.service';
import {Competition} from "../../shared/models/competition";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

/**
 * Competition component
 */
@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit, AfterViewInit {
  /**
   * Columns to show in table
   */
  displayedColumns: string[] = ['emblemUrl', 'name', 'area.ensignUrl', 'currentSeason.startDate', 'currentSeason.endDate', 'teams'];

  /**
   * Table Datasource
   */
  dataSource = new MatTableDataSource<Competition>()

  /**
   * Competitions Model
   */
  competitions: Competition[] = [];

  /**
   * Material sort
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Material paginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private footballService: FootballService) {
  }

  /**
   * Init competitions
   */
  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data: Competition, filter): boolean {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.includes(filter);
    };

    this.footballService.getCompetitions().subscribe((data) => {
      this.competitions = data;
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
   * Get competitions by season
   * @param $event
   */
  getCompetitionsBySeason($event: any): void {
    const season = $event.target.value.trim();
    this.dataSource.data =
      this.competitions
        .filter(
          data => season.length === 4
            && (data?.currentSeason?.startDate?.includes(season) || data?.currentSeason?.endDate?.includes(season))
        );
  }

  /**
   * Filter in competitions table
   * @param $event
   */
  doFilter($event: any): void {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  /**
   * Open the teams of a specific competition
   * @param competition competition object
   */
  openTeams(competition: Competition): void {
    console.log(competition);
  }

  /**
   * Performs validation on season input
   * @param $event
   */
  checkSeason($event: KeyboardEvent | any) {
    return $event.target.value.length < 4;
  }
}
