import { Component, inject } from '@angular/core';
import { GameCatalog } from '../../features/services/game-catalog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [RouterLink],
  templateUrl: './history.page.html',
})
export class HistoryPage {
  protected readonly gameCatalog = inject(GameCatalog);
}
