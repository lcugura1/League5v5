import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-pool',
  standalone: true,
  imports: [CommonModule], // ← ovo mora biti tu!
  templateUrl: './player-pool.component.html',
  styleUrl: './player-pool.component.scss'
})
export class PlayerPoolComponent {
  players = [
    { name: 'Player 1', role: 'Top' },
    { name: 'Player 2', role: 'Jungle' },
    { name: 'Player 3', role: 'Mid' },
    { name: 'Player 4', role: 'ADC' },
    { name: 'Player 5', role: 'Support' },
    { name: 'Player 6', role: 'Top' },
    { name: 'Player 7', role: 'Jungle' },
    { name: 'Player 8', role: 'Mid' },
    { name: 'Player 9', role: 'ADC' },
    { name: 'Player 10', role: 'Support' },
  ];
}
