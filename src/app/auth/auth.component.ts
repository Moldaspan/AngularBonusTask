import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.apiService.login(this.email, this.password).subscribe({
      next: (res) => {
        const token = res.access_token;
        this.apiService.setToken(token);
        alert(`Your token is: ${token}`); 
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.message = 'Login failed. Check your credentials.';
      },
    });
  }

  toggleMode(): void {
    this.message = '';
  }
}
