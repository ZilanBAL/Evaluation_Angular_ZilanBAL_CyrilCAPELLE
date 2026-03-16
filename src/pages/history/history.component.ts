import { Component, inject } from '@angular/core';
import { GameCatalog } from '../../features/game-catalog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [RouterLink],
  templateUrl: './history.page.html',
  styleUrl: './history.css',
})
export class HistoryPage {
  protected readonly gameCatalog = inject(GameCatalog);
}
