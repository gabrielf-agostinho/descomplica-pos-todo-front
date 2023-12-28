import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list-component/todo-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class TodoListModule { }
