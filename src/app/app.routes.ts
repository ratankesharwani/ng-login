import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children:AUTH_ROUTES
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path:'author',
        loadComponent: () =>
            import('./actor/actor.component').then((m) => m.ActorComponent),
    }
];
