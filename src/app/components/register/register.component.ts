import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import test from 'node:test';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  msgError:string = "";
  isLoading:boolean=false;

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern( /^\w{6,}$/ )]],
    rePassword:[null],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators: this.confirmPassword})

  registerSub !: Subscription

  registerSubmit():void
  {
    if(this.registerForm.valid)
    {
      this.isLoading = true;
      this.registerSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res) =>{
          console.log(res);
          if (res.message) {
            this._Router.navigate(['/login'])
          }
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse) =>{
          this.msgError = err.error.message;
            console.log(err);
            this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }

  confirmPassword(g : AbstractControl)
  {
    if(g.get('password')?.value === g.get('rePassword')?.value)
    {
      return null;
    }
    else
    {
      return{mismatch:true}
    }
  }
}
