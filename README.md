# League5v5
An Angular web application designed to automatically balance and create two teams of 5 players each for fair and competitive League of Legends games. The app analyzes player statistics including rank, win rate, champion mastery, and preferred roles to optimize team distribution and ensure balanced matches. 

## Features

### Team Balancing Algorithm
- **Smart MMR Distribution**: Analyzes player ranks and MMR to create equally skilled teams
- **Role Optimization**: Ensures each team has balanced lane assignments (Top, Jungle, Mid, ADC, Support)
- **Champion Pool Analysis**: Considers champion mastery and main champions for better team composition
- **Win Rate Calculation**: Factors in recent performance and win rates

### Player Management
- **Riot API Integration**: Import player data directly from Riot Games API
- **Manual Player Input**: Add custom players with manual stats
- **Player Profiles**: View detailed statistics for each player
- **Favorites System**: Save frequent players for quick access

### Match History
- **Game Tracking**: Record results of previous matches
- **Statistics Dashboard**: Visual representation of win/loss ratios per generated team
- **Performance Analytics**: Track which team compositions work best

## Technologies

- **Frontend Framework**: Angular 17+
- **Language**: TypeScript
- **State Management**: RxJS
- **UI Components**: Angular Material / Tailwind CSS
- **API Integration**: Riot Games API
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Reactive Forms
