import { Routes } from '@angular/router';
import { MainLayout } from'./layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {path:'dashboard', loadComponent: () => import('./page/dashboard/dashboard').then(m => m.Dashboard) },
            {path:'add-log', loadComponent: () => import('./page/add-food/add-food').then(m => m.AddFood) },
            {path:'daily-log', loadComponent: () => import('./page/daily-log/daily-log').then(m => m.DailyLog) },
            {path:'profile', loadComponent: () => import('./page/user-profile/user-profile').then(m => m.UserProfile) },
            {path:'weight', loadComponent: () => import('./page/weight-tracker/weight-tracker').then(m => m.WeightTracker) },
            // {path:'profile', loadChildren: () => import('./page/dashboard/dashboard').then(m => m.Dashboard) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
