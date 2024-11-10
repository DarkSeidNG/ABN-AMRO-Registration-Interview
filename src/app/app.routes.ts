import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/registration/registration.component').then(
            (m) => m.RegistrationComponent
          ),
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./features/registration/success/success.component').then(
            (m) => m.SuccessComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'register',
      },
    ],
  },
  {
    path: 'no-page-found',
    loadComponent: () =>
      import('./features/no-page/no-page.component').then(
        (m) => m.NoPageComponent
      ),
    title: 'ABN-AMRO Interview: Page not found',
  },
  {
    path: '**',
    redirectTo: 'no-page-found',
  },
];
