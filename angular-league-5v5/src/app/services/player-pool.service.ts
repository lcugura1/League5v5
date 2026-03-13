import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})

export class PlayerPoolService {
  private players = new BehaviorSubject<(Player | null)[]>(Array(10).fill(null));
  players$ = this.players.asObservable();

  addPlayer(player: Player): void {
    const current = this.players.getValue();
    const firstEmpty = current.findIndex(p => p === null);
    
    if (firstEmpty === -1) {
      return;
    }

    const updated = [...current];
    updated[firstEmpty] = player;
    this.players.next(updated);
  }

  removePlayer(index: number): void {
    const updated = [...this.players.getValue()];
    updated[index] = null;
    this.players.next(updated);
  }

  fairPlay(): { team1: Player[], team2: Player[] } {
    const nonEmpyPlayers = this.players.getValue().filter((p): p is Player => p !== null);

    if (nonEmpyPlayers.length < 2) {
      return { team1: [], team2: [] };
    }

    const sorted = [...nonEmpyPlayers].sort((a, b) => b.rankScore - a.rankScore);

    const team1: Player[] = [];
    const team2: Player[] = [];

    sorted.forEach((player, index) => {
      if (index % 2 === 0) team1.push(player);
      else team2.push(player);
    });

      return { team1, team2 };
  }
}
