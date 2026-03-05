import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiKey = environment.riotApiKey;
  private accountBaseUrl = 'https://europe.api.riotgames.com';
  private summonerBaseUrl = 'https://eun1.api.riotgames.com';

  constructor(private http: HttpClient) {}

  searchPlayer(gameName: string, tagLine: string): Observable<any> {
    // Korak 1: dohvati puuid prema gameName#tagLine
    return this.http.get<any>(
      `${this.accountBaseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers: { 'X-Riot-Token': this.apiKey } }
    ).pipe(
      // Korak 2: s puuidom dohvati summoner podatke
      switchMap(account => 
        this.http.get<any>(
          `${this.summonerBaseUrl}/lol/summoner/v4/summoners/by-puuid/${account.puuid}`,
          { headers: { 'X-Riot-Token': this.apiKey } }
        )
      )
    );
  }
}
