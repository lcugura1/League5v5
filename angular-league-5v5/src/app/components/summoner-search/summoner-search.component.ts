import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerPoolService } from '../../services/player-pool.service';

@Component({
  selector: 'app-summoner-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summoner-search.component.html',
  styleUrl: './summoner-search.component.scss'
})
export class SummonerSearchComponent {
  gameName: string = '';
  tagLine: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  private destroyRef = inject(DestroyRef);

  constructor(private playerService: PlayerService, private playerPoolService: PlayerPoolService) {}

  onSearch(): void {
    if (!this.gameName || !this.tagLine) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.playerService.searchPlayer(this.gameName, this.tagLine)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (player) => {
        this.isLoading = false;
        console.log('player: ', player);
        this.playerPoolService.addPlayer({
          summonerName: this.gameName,
          summonerLevel: player.summonerLevel,
          summonerIconId: player.profileIconId,
          puuid: player.puuid,
          rankScore: 0,
          tier: 'UNRANKED',
          rank: ''
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch player data. Please check the name and tag.';
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
