import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiKey = environment.riotApiKey;
  private accountBaseUrl = 'https://europe.api.riotgames.com';
  private summonerBaseUrl = 'https://eun1.api.riotgames.com';

  constructor(private http: HttpClient) {}

  searchPlayer(gameName: string, tagLine: string): Observable<any> {
    return this.http.get<Player>(
      `${this.accountBaseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers: { 'X-Riot-Token': this.apiKey } }
    ).pipe(
      catchError(error => {
        console.error('Error fetching player data:', error);
        return throwError(() => error);
      }),
      switchMap(account =>
        this.http.get<any>(
          `${this.summonerBaseUrl}/lol/summoner/v4/summoners/by-puuid/${account.puuid}`,
          { headers: { 'X-Riot-Token': this.apiKey } }
        )
      )
    );
  }

  getRankScore(tier: string, rank: string): number {
    const tierOrder: { [key: string]: number } = {
        'UNRANKED': 0, 'IRON': 1, 'BRONZE': 4, 'SILVER': 7, 'GOLD': 10,
        'PLATINUM': 13, 'EMERALD': 16, 'DIAMOND': 19,
        'MASTER': 22, 'GRANDMASTER': 24, 'CHALLENGER': 26
      };
      const rankOrder: { [key: string]: number } = { 'IV': 0, 'III': 1, 'II': 2, 'I': 3 };
      return (tierOrder[tier] || 0) + (rankOrder[rank] || 0);  
  }

  getLatestPatch(): Observable<string> {
    return this.http.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
      .pipe(map(versions => versions[0]));
  }

  getRankData(puuid: string): Observable<any> {
    return this.http.get<any[]>(
      `${this.summonerBaseUrl}/lol/league/v4/entries/by-puuid/${puuid}`, 
      { headers: { 'X-Riot-Token': this.apiKey } }
    ).pipe(map(leagues => leagues.find(e => e.queueType === 'RANKED_SOLO_5x5') || null));
  }

}
