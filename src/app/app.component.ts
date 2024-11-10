import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<main><div class="container"><router-outlet/></div></main>',
})
export class AppComponent {}
