import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PoolPlayer {
  summonerName: string,
  summonerLevel: number,
  summonerIconId: number,
  puuid: string
}

@Injectable({
  providedIn: 'root'
})

export class PlayerPoolService {
  private players = new BehaviorSubject<(PoolPlayer | null)[]>(Array(10).fill(null));
  players$ = this.players.asObservable();

  addPlayer(player: PoolPlayer): void {
    const current = this.players.getValue();
    const firstEmpty = current.findIndex(p => p === null);
    
    if (firstEmpty === -1) {
      return;
    }

    const updated = [...current];
    updated[firstEmpty] = player;
    this.players.next(updated);
  }
}
