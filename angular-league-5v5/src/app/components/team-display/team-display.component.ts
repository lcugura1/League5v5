import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/player';
import { TeamService } from '../../services/team.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-team-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-display.component.html',
  styleUrl: './team-display.component.scss'
})
export class TeamDisplayComponent implements OnInit {
  team1: Player[] = [];
  team2: Player[] = [];
  patchVersion: string = '14.24.1';

  private destroyRef = inject(DestroyRef);

  constructor(private teamService: TeamService, private playerService: PlayerService) {}  
  
  ngOnInit(): void {
    this.playerService.getLatestPatch()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v: string) => this.patchVersion = v);  

    this.teamService.team1$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(team => this.team1 = team);

    this.teamService.team2$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(team => this.team2 = team);
  }

  slots = Array(5);
}
