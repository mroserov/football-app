import {Component} from '@angular/core';
import {FootballService} from "../../shared/services/football.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubSink} from "subsink";
import {FootballConstants} from "../football.constants";
import {Player} from "../../shared/models/player";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  /**
   * Subsink to manage subscribe
   */
  private sub = new SubSink();

  /**
   * Team id
   */
  private teamId!: number;
  players!: Player[];

  constructor(private footballService: FootballService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) {
    this.sub.sink = this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      this.route.data.subscribe(data => {
        data['params'] = this.teamId
      });
      this.getPlayersByTeams(this.teamId);
    });
  }

  /**
   * Get players of team
   * @param id Id of team
   */
  private getPlayersByTeams(id: number) {
    this.footballService.getPlayersByTeam(id).subscribe((data) => {
      this.players = data;
    }, err => {
      // @ts-ignore
      this._snackBar.open(FootballConstants[err.error.errorCode], 'Close', {duration: 5000});
    });
  }

}
