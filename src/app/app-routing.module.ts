import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    canActivateChild: [authGuard],
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/todo-list/todo-list.module').then(mod => mod.TodoListModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
