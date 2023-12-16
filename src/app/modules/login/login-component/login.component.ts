import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuth } from '../interfaces/iauth';
import { IForm } from 'src/app/shared/interfaces/iform';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public hide: boolean = true;

  public get LF() {
    return this.loginForm.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.loginForm = this._createForm();
  }

  private _createForm(): FormGroup {
    const form: IForm<IAuth> = {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    };

    return this._formBuilder.group(form);
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this._toastService.showToast('Some fields are invalid, please fix them');
      return;
    }
  }
}
