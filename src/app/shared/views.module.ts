import {NgModule} from '@angular/core';
import {CompetitionsComponent} from '../football/competitions/competitions.component';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "./material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {TeamsComponent} from "../football/teams/teams.component";
import {PlayersComponent} from "../football/players/players.component";


@NgModule({
  declarations: [
    CompetitionsComponent,
    TeamsComponent,
    PlayersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CompetitionsComponent
  ]
})
export class ViewsModule {
}
