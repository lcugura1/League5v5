import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummonerSearchComponent } from './components/summoner-search/summoner-search.component';
import { PlayerPoolComponent } from './components/player-pool/player-pool.component';
import { TeamDisplayComponent } from './components/team-display/team-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SummonerSearchComponent, PlayerPoolComponent, TeamDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-league-5v5';
}
