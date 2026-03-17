import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCatalog } from '../../features/services/game-catalog';
import { PenduDessin } from '../../features/game/pendu-dessin/pendu-dessin';
import { MotAffichage } from '../../features/game/mot-affichage/mot-affichage';
import { LettresJouees } from '../../features/game/lettres-jouees/lettres-jouees';

@Component({
  selector: 'app-game',
  imports: [RouterLink, PenduDessin, MotAffichage, LettresJouees],
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
