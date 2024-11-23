import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  newUser: any = { name: '', age: 0 };
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: () => {
        this.message = 'Failed to load users.';
      },
    });
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  addUser(): void {
    this.apiService.addUser(this.newUser).subscribe(() => {
      alert('User added successfully!');
      this.loadUsers();
    });
  }

  updateUser(user: any): void {
    const updatedUser = { ...user, name: user.name + ' Updated' };
    this.apiService.updateUser(user.id, updatedUser).subscribe(() => {
      alert('User updated successfully!');
      this.loadUsers();
    });
  }

  deleteUser(id: number): void {
    this.apiService.deleteUser(id).subscribe(() => {
      alert('User deleted successfully!');
      this.loadUsers();
    });
  }
}
