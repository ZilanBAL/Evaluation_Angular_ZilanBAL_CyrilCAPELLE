import { Component, input } from '@angular/core';

@Component({
  selector: 'mot-affichage',
  imports: [],
  templateUrl: './mot-affichage.html',
})
export class MotAffichage {
  motVisible = input.required<string[]>();
}
