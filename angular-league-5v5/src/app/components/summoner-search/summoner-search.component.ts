import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerPoolService } from '../../services/player-pool.service';
import { map, switchMap, of, catchError, throwError } from 'rxjs';
import { SummonerSearchErrorComponent } from './summoner-search-error/summoner-search-error.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-summoner-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SummonerSearchErrorComponent, MatSnackBarModule],
  templateUrl: './summoner-search.component.html',
  styleUrl: './summoner-search.component.scss',
})
export class SummonerSearchComponent {
  gameName: string = '';
  tagLine: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  error: Error | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private playerService: PlayerService,
    private playerPoolService: PlayerPoolService,
    private snackBar: MatSnackBar
  ) {}

  private showError(message: string) : void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
  }); }
  onSearch(): void {
    if (!this.gameName || !this.tagLine) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.error = null;

    this.playerService
      .searchPlayer(this.gameName, this.tagLine)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((player) =>
          this.playerService
            .getRankData(player.puuid)
            .pipe(map((rankData) => ({ player, rankData }))),
        ),
        catchError((error) => {
          this.error = error;
          return of (null);
        }),
      )
      .subscribe({
        next: (result) => {

          if (!result) return;

          const { player, rankData } = result;
          this.isLoading = false;
          this.playerPoolService.addPlayer({
            summonerName: this.gameName,
            summonerLevel: player.summonerLevel,
            summonerIconId: player.profileIconId,
            puuid: player.puuid,
            tier: rankData?.tier || 'UNRANKED',
            rank: rankData?.rank || '',
            rankScore: this.playerService.getRankScore(
              rankData?.tier || 'UNRANKED',
              rankData?.rank || 'IV',
            ),
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.showError('Failed to fetch player data. Please check the summoner name and tag line.');
          console.error(err);
        },
      });
  }
}
