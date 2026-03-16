import { Component, input } from '@angular/core';

@Component({
  selector: 'pendu-dessin',
  imports: [],
  templateUrl: './pendu-dessin.html',
})
export class PenduDessin {
  erreurs = input.required<number>();
}
