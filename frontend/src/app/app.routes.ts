import { Routes } from '@angular/router';
import { hasValidTokenGuard } from './shared/guards/has-valid-token.guard';

export const routes: Routes = [
    {
        path: '',
        canActivateChild: [hasValidTokenGuard()],
        children: [
            { path: '', redirectTo: '/playlist-sorting', pathMatch: 'full' },
            {
                path: 'playlist-sorting',
                loadChildren: () =>
                    import('./playlist-sorting/playlist-sorting.routes').then(
                        (routes) => routes.routes,
                    ),
            },
        ],
    },

    //TODO:  { path: '**', component: PageNotFoundComponent },
];
