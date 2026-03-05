import { Component, OnInit } from '@angular/core';
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

export class PlayerPoolComponent implements OnInit{
  players: (Player | null)[] = Array(10).fill(null);
  patchVersion: string = '14.24.1';

  constructor(private playerPoolService: PlayerPoolService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getLatestPatch().subscribe(v => this.patchVersion = v);
    this.playerPoolService.players$.subscribe(players => {
      this.players = players;
    });
  }
}
