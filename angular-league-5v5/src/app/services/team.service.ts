import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private team1 = new BehaviorSubject<Player[]>([]);
  private team2 = new BehaviorSubject<Player[]>([]);  

  team1$ = this.team1.asObservable();
  team2$ = this.team2.asObservable();

  setTeams(team1: Player[], team2: Player[]): void {
    this.team1.next(team1);
    this.team2.next(team2);
  }
  
  constructor() { }
}
