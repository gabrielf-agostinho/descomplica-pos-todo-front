import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

type Errors = {
  [key: string]: ((err?: ValidationErrors) => string) | undefined;
}

@Component({
  selector: 'app-validator-handler',
  template: `
    <ng-container *ngIf="shouldShowErrors()">
      <mat-error *ngFor="let error of listOfErrors()">
        <small>{{ error }}</small>
      </mat-error>
    </ng-container>
  `,
})
export class ValidatorHandlerComponent {
  @Input({ required: true })
  field!: AbstractControl;

  private _ERROR_MESSAGES: Errors = {
    required: () => 'This field is required',
    email: () => 'invalid e-mail'
  };

  public listOfErrors(): string[] {
    return Object.keys(this.field.errors!).map((key) => this._ERROR_MESSAGES[key] ? this._ERROR_MESSAGES[key]!(this.field.getError(key)) : '');
  }

  public shouldShowErrors(): boolean | null {
    return this.field && this.field.errors && this.field.touched;
  }
}
