import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerPoolService } from '../../services/player-pool.service';
import { map, switchMap } from 'rxjs';

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
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(player =>
          this.playerService.getRankData(player.puuid).pipe(
            map(rankData => ({ player, rankData }))
          )
        )
      )
      .subscribe({
        next: ({ player, rankData }) => {
          console.log('profileIconId:', player.profileIconId);
          this.isLoading = false;
          this.playerPoolService.addPlayer({
            summonerName: this.gameName,
            summonerLevel: player.summonerLevel,
            summonerIconId: player.profileIconId,
            puuid: player.puuid,
            tier: rankData?.tier || 'UNRANKED',
            rank: rankData?.rank || '',
            rankScore: this.playerService.getRankScore(rankData?.tier || 'UNRANKED', rankData?.rank || 'IV')
          });
        },
        error: (err: any) => {
          this.errorMessage = 'Failed to fetch player data.';
          this.isLoading = false;
          console.error(err);
        }
      });
  }
}
