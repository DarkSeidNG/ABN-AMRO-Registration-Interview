import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  private router = inject(Router);
  protected successMessage: string | undefined;

  ngOnInit(): void {
    if (history.state && history.state.data) {
      this.successMessage = history.state.data.message;
    } else {
      this.router.navigate(['/register']);
    }
  }
}
