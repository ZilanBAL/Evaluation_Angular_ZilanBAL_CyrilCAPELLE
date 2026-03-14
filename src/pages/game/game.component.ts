import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type EtatPartie = 'en-cours' | 'gagne' | 'perdu';

// type EtatChargement = 'IDLE' | 'LOADING' | 'ERROR' | 'LOADED';

const LISTE_MOTS = ['MARVEL', 'IRONMAN', 'SPIDERMAN', 'HULK', 'LOKI', 'TITI'];

@Component({
  selector: 'app-game',
  imports: [RouterLink],
  templateUrl: './game.page.html',
  styleUrl: './game.css',
})
export class GamePage implements OnInit {
  private readonly _mot = signal<string>('');
  readonly mot = this._mot.asReadonly();

  private readonly _lettresJouees = signal<string[]>([]);
  readonly lettresJouees = this._lettresJouees.asReadonly();

  private readonly _erreurs = signal<number>(0);
  readonly erreurs = this._erreurs.asReadonly();

  private readonly _etat = signal<EtatPartie>('en-cours');
  readonly etat = this._etat.asReadonly();

  readonly motVisible = computed(() =>
    this._mot()
      .split('')
      .map((lettre) => (this._lettresJouees().includes(lettre) ? lettre : '_')),
  );

  nouvellePartie(): void {
    const mot = LISTE_MOTS[Math.floor(Math.random() * LISTE_MOTS.length)];
    this._mot.set(mot);
    this._lettresJouees.set([]);
    this._erreurs.set(0);
    this._etat.set('en-cours');
  }

  jouerLettre(lettre: string): void {
    if (this._etat() !== 'en-cours') return;

    const maj = lettre.toUpperCase();
    if (!/^[A-Z]$/.test(maj)) return;
    if (this._lettresJouees().includes(maj)) return;

    this._lettresJouees.update((lettresActuelles) => [...lettresActuelles, maj]);

    if (!this._mot().includes(maj)) this._erreurs.update((nombreErreurs) => nombreErreurs + 1);

    const partieGagnee = this._mot()
      .split('')
      .every((lettre) => this._lettresJouees().includes(lettre));

    if (partieGagnee) this._etat.set('gagne');
    else if (this._erreurs() >= 5) this._etat.set('perdu');
  }

  ngOnInit(): void {
    this.nouvellePartie();
    document.addEventListener('keydown', (event) => {
      this.jouerLettre(event.key);
    });
  }
}
