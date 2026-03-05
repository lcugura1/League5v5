import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPoolService, PoolPlayer } from '../../services/player-pool.service';

@Component({
  selector: 'app-player-pool',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './player-pool.component.html',
  styleUrl: './player-pool.component.scss'
})
export class PlayerPoolComponent implements OnInit{
  players: (PoolPlayer | null)[] = Array(10).fill(null);

  constructor(private playerPoolService: PlayerPoolService) {}

  ngOnInit(): void {
    this.playerPoolService.players$.subscribe(players => {
      this.players = players;
    });
  }
}
