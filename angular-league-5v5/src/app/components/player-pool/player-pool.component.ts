import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PlayerPoolService } from '../../services/player-pool.service';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-pool',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-pool.component.html',
  styleUrl: './player-pool.component.scss'
})
export class PlayerPoolComponent implements OnInit {
  players: (Player | null)[] = Array(10).fill(null);
  patchVersion: string = '14.24.1';
  selectedIndex: number | null = null;  

  private destroyRef = inject(DestroyRef);

  constructor(
    private playerPoolService: PlayerPoolService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.playerService.getLatestPatch()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.patchVersion = v);

    this.playerPoolService.players$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(players => this.players = players);
  }

  selectPlayer(index: number): void {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  removePlayer(): void {
    if (this.selectedIndex === null) return;
    this.playerPoolService.removePlayer(this.selectedIndex);
    this.selectedIndex = null;
  }

  fairPlay(): void {
    if (!this.hasPlayers) return; 
    const { team1, team2 } = this.playerPoolService.fairPlay();
    console.log('Team 1:', team1);
    console.log('Team 2:', team2);
  }

  get hasPlayers(): boolean {
    return this.players.some(player => player !== null);
  }

}
