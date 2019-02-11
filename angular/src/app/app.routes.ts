import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { DetailComponent } from './detail/detail.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'table',
        component: TableComponent,
        data: {
          breadcrumb: 'Table'
        }
      },
      {
        path: 'detail',
        component: DetailComponent,
        data: {
          breadcrumb: 'Detail'
        }
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
