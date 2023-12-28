import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ITodo } from '../interfaces/itodo';
import { TodoListService } from '../services/todo-list.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { first } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm } from 'src/app/shared/interfaces/iform';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @ViewChild('newTodo')
  public newTodoTemplate!: TemplateRef<any>;

  public todoForm: FormGroup;

  public get F() {
    return this.todoForm.controls;
  }

  public todo: ITodo[] = [];
  public done: ITodo[] = [];

  private ref?: MatDialogRef<any, any>;

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _todoService: TodoListService,
    private _authService: AuthService
  ) {
    this.todoForm = this._buildForm();
  }

  private _buildForm(): FormGroup {
    const form: IForm<ITodo> = {
      id: [null],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      finished: [false],
      userId: this._authService.user?.id
    };

    return this._formBuilder.group(form);
  }

  public ngOnInit(): void {
    this._getAllTodosByUser();
  }

  private _getAllTodosByUser(): void {
    this._todoService.getAllByUser(this._authService.user?.id!).pipe(first()).subscribe((todoList => {
      this.todo = todoList.filter(todo => !todo.finished);
      this.done = todoList.filter(todo => todo.finished);
    }));
  }

  public openDialog(): void {
    this.ref = this._dialog.open(this.newTodoTemplate);

    this.ref.backdropClick().subscribe(() => this.resetForm());
    this.ref.keydownEvents().subscribe(keyEvent => keyEvent.code === 'Escape' ? this.resetForm() : null);
  }

  public onSubmit(): void {
    if (this.todoForm.invalid) {
      this._toastService.showToast('Some fields are invalid, please fix them');
      return;
    }

    if (!this.F['id'].value)
      this._post();
    else
      this._put();
  }

  private _post(): void {
    this._todoService.post(this.todoForm.value).subscribe({
      next: () => this._onSuccess('TODO created'),
      error: (err) => this._toastService.showToast(err)
    });
  }

  private _put(): void {
    this._todoService.put(this.todoForm.value).subscribe({
      next: () => this._onSuccess('TODO updated'),
      error: (err) => this._toastService.showToast(err)
    });
  }

  private _onSuccess(message: string): void {
    this._toastService.showToast(message);
    this.ref?.close();
    this._getAllTodosByUser();
    this.resetForm();
  }

  public resetForm(): void {
    this.todoForm = this._buildForm();
  }

  public drop(event: CdkDragDrop<ITodo[]>): void {
    if (event.container === event.previousContainer)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else {
      const item = event.previousContainer.data[event.previousIndex] as ITodo;

      item.finished = !item.finished;

      this.todoForm.patchValue(item);

      this.onSubmit();
    }
  }
}
