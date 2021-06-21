import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompetitionsComponent} from "./football/competitions/competitions.component";
import {TeamsComponent} from "./football/teams/teams.component";
import {PlayersComponent} from "./football/players/players.component";

/**
 * routes of app
 */
const routes: Routes = [
  { path: '', redirectTo: 'competitions', pathMatch: 'full' },
  {
    path: 'competitions',
    component: CompetitionsComponent,
    data: {breadcrumb: 'Competitions'},
  },
  {
    path: 'competitions/teams/:id',
    component: TeamsComponent,
    data: {breadcrumb: 'Teams', parent: 'competitions'}
  },
  {
    path: 'competitions/teams/players/:id',
    component: PlayersComponent,
    data: {breadcrumb: 'Players', parent: 'teams'}
  },
  { path: '**', redirectTo: 'competitions'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


// ,
// children: [
//   {
//     path: 'players',
//     component: TeamsComponent,
//     data: {breadcrumb: 'Players'},
//     children: [
//       {
//         path: 'player',
//         component: TeamsComponent,
//         data: {breadcrumb: 'Player'}
//       }
//     ]
//   }
// ]
