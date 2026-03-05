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
}
