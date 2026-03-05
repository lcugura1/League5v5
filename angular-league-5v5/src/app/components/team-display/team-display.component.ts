import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-display',
  standalone: true,
  imports: [CommonModule], // ← ovo mora biti tu!
  templateUrl: './team-display.component.html',
  styleUrl: './team-display.component.scss'
})
export class TeamDisplayComponent {
  slots = Array(5);
}
