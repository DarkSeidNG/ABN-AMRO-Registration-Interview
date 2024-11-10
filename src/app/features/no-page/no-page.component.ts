import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.scss',
})
export class NoPageComponent {}
