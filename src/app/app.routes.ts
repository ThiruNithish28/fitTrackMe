import { Routes } from '@angular/router';
import { MainLayout } from'./layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {path:'dashboard', loadComponent: () => import('./page/dashboard/dashboard').then(m => m.Dashboard) },
            {path:'add-log', loadComponent: () => import('./page/add-food/add-food').then(m => m.AddFood) },
            // {path:'profile', loadChildren: () => import('./page/dashboard/dashboard').then(m => m.Dashboard) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
