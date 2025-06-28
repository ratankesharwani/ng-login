import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { AlertComponent } from "../../alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  alertMsg: string | null = null;
  alertType: any | 'success' | 'danger' = 'success';

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      let params = {
        username: formValue.username,
        password: formValue.password
      }
      this.apiService.login(params).subscribe(res => {
        if (res.status === 200) {
          this.openAlert(res.message, 'success');
          localStorage.setItem('accessToken',res.data.token);
          setTimeout(() => {
            this.router.navigate(['/author'])
          }, 3000);
        }
      }, error => {
        this.openAlert(error.error.message, 'danger');
      })
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

  goToSignUp() {
    this.router.navigate(['/auth/signup'])
  }
}
