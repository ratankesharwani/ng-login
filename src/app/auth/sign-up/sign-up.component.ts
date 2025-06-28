import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../alert/alert.component";
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  alertMsg: string | null = null;
  alertType: any | 'success' | 'danger' = 'success';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      role: ['admin', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      if (formValue.password !== formValue.confirmPassword) {
        this.openAlert('Password mismatch', 'danger');
        return;
      }
      let params = {
        username: formValue.username,
        password: formValue.password,
        role: formValue.role,
      }
      this.apiService.register(params).subscribe(res => {
        if (res.status === 200) {
          this.openAlert(res.message, 'success');
          setTimeout(() => {
            this.goToLogin();
          }, 3000);
          this.goToLogin();
        }
      }, error => {
        this.openAlert(error.error.message, 'danger');
      })

    } else {
      this.openAlert('Invalid form!', 'danger');
    }
  }

  openAlert(msg, type) {
    this.alertMsg = msg
    this.alertType = type;
    setTimeout(() => {
      this.alertMsg = null;
      this.alertType = null;
    }, 3000);
  }

  goToLogin(){
    this.router.navigate(['/auth/login'])
  }
}
