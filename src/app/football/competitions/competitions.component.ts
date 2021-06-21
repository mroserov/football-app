import {Component, AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
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
   * Season to search
   */
  season: string = '';

  @ViewChild("season") inputSeason!: ElementRef;

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

    this.footballService.getCompetitions().subscribe((data: Competition[]) => {
      this.competitions = data;
      this.season = this.inputSeason.nativeElement.value = localStorage.getItem('season') || '';
      this.getCompetitionsBySeason();
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
   * @param target
   */
  getCompetitionsBySeason(target: any = {value: this.season}): void {
    this.season = target.value.trim();
    localStorage.setItem('season', this.season);
    this.dataSource.data =
      this.competitions
        .filter(
          data => this.season.length === 4
            && (data?.currentSeason?.startDate?.includes(this.season) || data?.currentSeason?.endDate?.includes(this.season))
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
   * Performs validation on season input
   * @param $event
   */
  checkSeason($event: KeyboardEvent | any) {
    return $event.target.value.length < 4;
  }
}
