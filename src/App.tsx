import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Home, Plane, BarChart3, Calendar } from 'lucide-react';

interface TeamData {
  position: number;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  homeStats: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  };
  awayStats: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  };
}

const teams: TeamData[] = [
  {
    position: 1,
    name: "1. FC Köln",
    played: 34,
    wins: 18,
    draws: 7,
    losses: 9,
    goalsFor: 53,
    goalsAgainst: 38,
    goalDifference: 15,
    points: 61,
    homeStats: { played: 17, wins: 9, draws: 4, losses: 4, goalsFor: 33, goalsAgainst: 18, goalDifference: 15, points: 31 },
    awayStats: { played: 17, wins: 9, draws: 3, losses: 5, goalsFor: 20, goalsAgainst: 20, goalDifference: 0, points: 30 }
  },
  {
    position: 2,
    name: "Hamburger SV",
    played: 34,
    wins: 16,
    draws: 11,
    losses: 7,
    goalsFor: 78,
    goalsAgainst: 44,
    goalDifference: 34,
    points: 59,
    homeStats: { played: 17, wins: 8, draws: 7, losses: 2, goalsFor: 44, goalsAgainst: 20, goalDifference: 24, points: 31 },
    awayStats: { played: 17, wins: 8, draws: 4, losses: 5, goalsFor: 34, goalsAgainst: 24, goalDifference: 10, points: 28 }
  },
  {
    position: 3,
    name: "SV Elversberg",
    played: 34,
    wins: 16,
    draws: 10,
    losses: 8,
    goalsFor: 64,
    goalsAgainst: 37,
    goalDifference: 27,
    points: 58,
    homeStats: { played: 17, wins: 9, draws: 3, losses: 5, goalsFor: 39, goalsAgainst: 25, goalDifference: 14, points: 30 },
    awayStats: { played: 17, wins: 7, draws: 7, losses: 3, goalsFor: 25, goalsAgainst: 12, goalDifference: 13, points: 28 }
  },
  {
    position: 4,
    name: "SC Paderborn",
    played: 34,
    wins: 15,
    draws: 10,
    losses: 9,
    goalsFor: 56,
    goalsAgainst: 46,
    goalDifference: 10,
    points: 55,
    homeStats: { played: 17, wins: 8, draws: 3, losses: 6, goalsFor: 30, goalsAgainst: 23, goalDifference: 7, points: 27 },
    awayStats: { played: 17, wins: 7, draws: 7, losses: 3, goalsFor: 26, goalsAgainst: 23, goalDifference: 3, points: 28 }
  },
  {
    position: 5,
    name: "1. FC Magdeburg",
    played: 34,
    wins: 14,
    draws: 11,
    losses: 9,
    goalsFor: 64,
    goalsAgainst: 52,
    goalDifference: 12,
    points: 53,
    homeStats: { played: 17, wins: 5, draws: 7, losses: 5, goalsFor: 28, goalsAgainst: 29, goalDifference: -1, points: 22 },
    awayStats: { played: 17, wins: 9, draws: 4, losses: 4, goalsFor: 36, goalsAgainst: 23, goalDifference: 13, points: 31 }
  },
  {
    position: 6,
    name: "Fortuna Düsseldorf",
    played: 34,
    wins: 14,
    draws: 11,
    losses: 9,
    goalsFor: 57,
    goalsAgainst: 52,
    goalDifference: 5,
    points: 53,
    homeStats: { played: 17, wins: 7, draws: 5, losses: 5, goalsFor: 29, goalsAgainst: 27, goalDifference: 2, points: 26 },
    awayStats: { played: 17, wins: 7, draws: 6, losses: 4, goalsFor: 28, goalsAgainst: 25, goalDifference: 3, points: 27 }
  },
  {
    position: 7,
    name: "1. FC Kaiserslautern",
    played: 34,
    wins: 15,
    draws: 8,
    losses: 11,
    goalsFor: 56,
    goalsAgainst: 55,
    goalDifference: 1,
    points: 53,
    homeStats: { played: 17, wins: 9, draws: 5, losses: 3, goalsFor: 34, goalsAgainst: 22, goalDifference: 12, points: 32 },
    awayStats: { played: 17, wins: 6, draws: 3, losses: 8, goalsFor: 22, goalsAgainst: 33, goalDifference: -11, points: 21 }
  },
  {
    position: 8,
    name: "Karlsruher SC",
    played: 34,
    wins: 14,
    draws: 10,
    losses: 10,
    goalsFor: 57,
    goalsAgainst: 55,
    goalDifference: 2,
    points: 52,
    homeStats: { played: 17, wins: 9, draws: 4, losses: 4, goalsFor: 31, goalsAgainst: 24, goalDifference: 7, points: 31 },
    awayStats: { played: 17, wins: 5, draws: 6, losses: 6, goalsFor: 26, goalsAgainst: 31, goalDifference: -5, points: 21 }
  },
  {
    position: 9,
    name: "Hannover 96",
    played: 34,
    wins: 13,
    draws: 12,
    losses: 9,
    goalsFor: 41,
    goalsAgainst: 36,
    goalDifference: 5,
    points: 51,
    homeStats: { played: 17, wins: 8, draws: 7, losses: 2, goalsFor: 23, goalsAgainst: 15, goalDifference: 8, points: 31 },
    awayStats: { played: 17, wins: 5, draws: 5, losses: 7, goalsFor: 18, goalsAgainst: 21, goalDifference: -3, points: 20 }
  },
  {
    position: 10,
    name: "1. FC Nürnberg",
    played: 34,
    wins: 14,
    draws: 6,
    losses: 14,
    goalsFor: 60,
    goalsAgainst: 57,
    goalDifference: 3,
    points: 48,
    homeStats: { played: 17, wins: 8, draws: 2, losses: 7, goalsFor: 30, goalsAgainst: 28, goalDifference: 2, points: 26 },
    awayStats: { played: 17, wins: 6, draws: 4, losses: 7, goalsFor: 30, goalsAgainst: 29, goalDifference: 1, points: 22 }
  },
  {
    position: 11,
    name: "Hertha Berlin",
    played: 34,
    wins: 12,
    draws: 8,
    losses: 14,
    goalsFor: 49,
    goalsAgainst: 51,
    goalDifference: -2,
    points: 44,
    homeStats: { played: 17, wins: 4, draws: 5, losses: 8, goalsFor: 20, goalsAgainst: 24, goalDifference: -4, points: 17 },
    awayStats: { played: 17, wins: 8, draws: 3, losses: 6, goalsFor: 29, goalsAgainst: 27, goalDifference: 2, points: 27 }
  },
  {
    position: 12,
    name: "SV Darmstadt 98",
    played: 34,
    wins: 11,
    draws: 9,
    losses: 14,
    goalsFor: 56,
    goalsAgainst: 55,
    goalDifference: 1,
    points: 42,
    homeStats: { played: 17, wins: 8, draws: 4, losses: 5, goalsFor: 29, goalsAgainst: 20, goalDifference: 9, points: 28 },
    awayStats: { played: 17, wins: 3, draws: 5, losses: 9, goalsFor: 27, goalsAgainst: 35, goalDifference: -8, points: 14 }
  },
  {
    position: 13,
    name: "SpVgg Greuther Fürth",
    played: 34,
    wins: 10,
    draws: 9,
    losses: 15,
    goalsFor: 45,
    goalsAgainst: 59,
    goalDifference: -14,
    points: 39,
    homeStats: { played: 17, wins: 6, draws: 5, losses: 6, goalsFor: 26, goalsAgainst: 30, goalDifference: -4, points: 23 },
    awayStats: { played: 17, wins: 4, draws: 4, losses: 9, goalsFor: 19, goalsAgainst: 29, goalDifference: -10, points: 16 }
  },
  {
    position: 14,
    name: "FC Schalke 04",
    played: 34,
    wins: 10,
    draws: 8,
    losses: 16,
    goalsFor: 52,
    goalsAgainst: 62,
    goalDifference: -10,
    points: 38,
    homeStats: { played: 17, wins: 6, draws: 3, losses: 8, goalsFor: 31, goalsAgainst: 35, goalDifference: -4, points: 21 },
    awayStats: { played: 17, wins: 4, draws: 5, losses: 8, goalsFor: 21, goalsAgainst: 27, goalDifference: -6, points: 17 }
  },
  {
    position: 15,
    name: "Preußen Münster",
    played: 34,
    wins: 8,
    draws: 12,
    losses: 14,
    goalsFor: 40,
    goalsAgainst: 43,
    goalDifference: -3,
    points: 36,
    homeStats: { played: 17, wins: 4, draws: 7, losses: 6, goalsFor: 17, goalsAgainst: 17, goalDifference: 0, points: 19 },
    awayStats: { played: 17, wins: 4, draws: 5, losses: 8, goalsFor: 23, goalsAgainst: 26, goalDifference: -3, points: 17 }
  },
  {
    position: 16,
    name: "Eintracht Braunschweig",
    played: 34,
    wins: 8,
    draws: 11,
    losses: 15,
    goalsFor: 38,
    goalsAgainst: 64,
    goalDifference: -26,
    points: 35,
    homeStats: { played: 17, wins: 6, draws: 5, losses: 6, goalsFor: 22, goalsAgainst: 26, goalDifference: -4, points: 23 },
    awayStats: { played: 17, wins: 2, draws: 6, losses: 9, goalsFor: 16, goalsAgainst: 38, goalDifference: -22, points: 12 }
  },
  {
    position: 17,
    name: "FC Ulm 1846",
    played: 34,
    wins: 6,
    draws: 12,
    losses: 16,
    goalsFor: 36,
    goalsAgainst: 48,
    goalDifference: -12,
    points: 30,
    homeStats: { played: 17, wins: 4, draws: 5, losses: 8, goalsFor: 21, goalsAgainst: 22, goalDifference: -1, points: 17 },
    awayStats: { played: 17, wins: 2, draws: 7, losses: 8, goalsFor: 15, goalsAgainst: 26, goalDifference: -11, points: 13 }
  },
  {
    position: 18,
    name: "SSV Jahn Regensburg",
    played: 34,
    wins: 6,
    draws: 7,
    losses: 21,
    goalsFor: 23,
    goalsAgainst: 71,
    goalDifference: -48,
    points: 25,
    homeStats: { played: 17, wins: 6, draws: 5, losses: 6, goalsFor: 14, goalsAgainst: 19, goalDifference: -5, points: 23 },
    awayStats: { played: 17, wins: 0, draws: 2, losses: 15, goalsFor: 9, goalsAgainst: 52, goalDifference: -43, points: 2 }
  }
];

function App() {
  const [viewMode, setViewMode] = useState<'overall' | 'home' | 'away'>('overall');

  const getPositionColor = (position: number) => {
    if (position <= 2) return 'bg-green-100 border-l-4 border-green-500';
    if (position === 3) return 'bg-orange-100 border-l-4 border-orange-500';
    if (position >= 16) return 'bg-red-100 border-l-4 border-red-500';
    return 'bg-white hover:bg-gray-50';
  };

  const getPositionIcon = (position: number) => {
    if (position <= 2) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (position === 3) return <BarChart3 className="w-4 h-4 text-orange-600" />;
    if (position >= 16) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getCurrentStats = (team: TeamData) => {
    switch (viewMode) {
      case 'home':
        return team.homeStats;
      case 'away':
        return team.awayStats;
      default:
        return {
          played: team.played,
          wins: team.wins,
          draws: team.draws,
          losses: team.losses,
          goalsFor: team.goalsFor,
          goalsAgainst: team.goalsAgainst,
          goalDifference: team.goalDifference,
          points: team.points
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">2. Bundesliga</h1>
                  <p className="text-white/90">2024-25 Sezonu Puan Tablosu</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>34 Hafta</span>
              </div>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode('overall')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'overall' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Genel</span>
              </button>
              <button
                onClick={() => setViewMode('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'home' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>İç Saha</span>
              </button>
              <button
                onClick={() => setViewMode('away')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'away' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Dış Saha</span>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Bundesliga Yükselmesi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Playoff</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>3. Liga Düşmesi</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sıra
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Takım
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    O
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    G
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    B
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    M
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    A
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Y
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AV
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Puan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teams.map((team) => {
                  const stats = getCurrentStats(team);
                  return (
                    <tr
                      key={team.name}
                      className={`${getPositionColor(team.position)} transition-all duration-200 hover:shadow-md`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            {team.position}
                          </span>
                          {getPositionIcon(team.position)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {team.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {team.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-medium">
                        {stats.played}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">
                        {stats.wins}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">
                        {stats.draws}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">
                        {stats.losses}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-medium">
                        {stats.goalsFor}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-medium">
                        {stats.goalsAgainst}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <span className={`${stats.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stats.goalDifference > 0 ? '+' : ''}{stats.goalDifference}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                          {stats.points}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">
            <p>O: Oynanmış | G: Galibiyet | B: Beraberlik | M: Mağlubiyet | A: Atılan | Y: Yenilen | AV: Averaj</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;