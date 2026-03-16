import { Component, input } from '@angular/core';

@Component({
  selector: 'lettres-jouees',
  imports: [],
  templateUrl: './lettres-jouees.html',
})
export class LettresJouees {
  lettres = input.required<string[]>();
  mot = input.required<string>();
}
