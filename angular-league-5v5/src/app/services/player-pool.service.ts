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
}
