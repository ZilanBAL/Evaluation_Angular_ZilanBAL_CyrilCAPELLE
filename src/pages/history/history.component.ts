import { Component, inject } from '@angular/core';
import { GameCatalog } from '../../features/services/game-catalog';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [RouterLink, DatePipe],
  templateUrl: './history.page.html',
})
export class HistoryPage {
  protected readonly gameCatalog = inject(GameCatalog);
}
