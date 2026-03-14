import { Routes } from '@angular/router';
import { GamePage } from '../pages/game/game.component';
import { HistoryPage } from '../pages/history/history.component';
import { NotFound } from '../pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: GamePage,
    title: 'Angular - Jeu du Pendu',
  },
  {
    path: 'history',
    component: HistoryPage,
    title: 'Angular - Historique',
  },
  {
    path: '**',
    component: NotFound,
    title: '404 - Tu es perdu ?',
  },
];
