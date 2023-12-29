import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm } from 'src/app/shared/interfaces/iform';
import { IUserWithPassword } from 'src/app/shared/interfaces/iuser';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public hide: boolean = true;

  public get RF() {
    return this.registerForm.controls;
  }

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _registerService: RegisterService
  ) { 
    this.registerForm = this._buildForm();
  }

  private _buildForm(): FormGroup {
    const form: IForm<IUserWithPassword> = {
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    }

    return this._formBuilder.group(form);
  }

  public clearForm(): void {
    this.registerForm.reset(this._buildForm());
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      this._toastService.showToast('Some fields are invalid, please fix them');
      return;
    }

    this._registerService.register(this.registerForm.value).subscribe({
      next: () => {
        this._toastService.showToast('successfully registered user');
        this._router.navigate(['/login']);
      },
      error: (err) => console.error(err)
    });
  }
}
