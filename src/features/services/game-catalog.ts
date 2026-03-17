import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of } from 'rxjs';

type EtatPartie = 'en-cours' | 'gagne' | 'perdu';
type EtatChargement = 'IDLE' | 'LOADING' | 'ERROR' | 'LOADED';

const LISTE_MOTS = ['MARVEL', 'IRONMAN', 'SPIDERMAN', 'HULK', 'LOKI', 'TITI'];

export type HistoriquePartie = {
  id: number;
  mot: string;
  etat: EtatPartie;
  erreurs: number;
  date: Date;
  lettresJouees: string[];
};

@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
  private readonly http = inject(HttpClient);

  private readonly _mot = signal<string>('');
  readonly mot = this._mot.asReadonly();

  private readonly _lettresJouees = signal<string[]>([]);
  readonly lettresJouees = this._lettresJouees.asReadonly();

  private readonly _erreurs = signal<number>(0);
  readonly erreurs = this._erreurs.asReadonly();

  private readonly _etat = signal<EtatPartie>('en-cours');
  readonly etat = this._etat.asReadonly();

  private readonly _historique = signal<HistoriquePartie[]>([]);
  readonly historique = this._historique.asReadonly();

  private readonly _chargement = signal<EtatChargement>('IDLE');

  isChargement(etat: EtatChargement): boolean {
    return this._chargement() === etat;
  }

  readonly motVisible = computed(() =>
    this._mot()
      .split('')
      .map((lettre) => (this._lettresJouees().includes(lettre) ? lettre : '_')),
  );

  readonly record = computed(() => {
    let compte = 0;
    for (const partie of this._historique()) {
      if (partie.etat === 'gagne') compte++;
      else break;
    }
    return compte;
  });

  private prochainId = 1;
  private _sauvegarder(etat: EtatPartie): void {
    this._historique.update((historique) => [
      {
        id: this.prochainId++,
        mot: this._mot(),
        etat,
        erreurs: this._erreurs(),
        date: new Date(),
        lettresJouees: this._lettresJouees(),
      },
      ...historique,
    ]);
  }

  nouvellePartie(): void {
    this._chargement.set('LOADING');
    this.http
      .get<{ word: string }[]>(
        'https://random-words-api.kushcreates.com/api?language=fr&length=10&type=uppercase&words=1',
      )
      .pipe(
        map((res) => {
          const mot = res[0].word;
          if (mot.includes(' ') || mot.includes('-'))
            return LISTE_MOTS[Math.floor(Math.random() * LISTE_MOTS.length)];
          return mot;
        }),
        catchError(() => {
          this._chargement.set('ERROR');
          return of(LISTE_MOTS[Math.floor(Math.random() * LISTE_MOTS.length)]);
        }),
      )
      .subscribe((mot) => {
        this._mot.set(mot);
        this._lettresJouees.set([]);
        this._erreurs.set(0);
        this._etat.set('en-cours');
        this._chargement.set('LOADED');
      });
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

    if (partieGagnee || this._erreurs() >= 5) this._sauvegarder(partieGagnee ? 'gagne' : 'perdu');
  }
}
