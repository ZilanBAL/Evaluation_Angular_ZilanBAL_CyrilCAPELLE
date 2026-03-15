import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCatalog } from '../../features/game-catalog';

@Component({
  selector: 'app-game',
  imports: [RouterLink],
  templateUrl: './game.page.html',
  styleUrl: './game.css',
})
export class GamePage implements OnInit {
  protected readonly gameCatalog = inject(GameCatalog);

  ngOnInit(): void {
    this.gameCatalog.nouvellePartie();
    document.addEventListener('keydown', (event) => {
      this.gameCatalog.jouerLettre(event.key);
    });
  }
}
