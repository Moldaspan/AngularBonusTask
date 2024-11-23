import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://67415d71e4647499008d7c06.mockapi.io/users'; // Mock API URL
  private authUrl = 'http://localhost:8000/auth'; // Base URL for Auth
  private jwtToken: string = '';

  constructor(private http: HttpClient) { }

  // Store the JWT token

  getToken(): string {
    return this.jwtToken;
  }

  // Login with email and password
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, { email, password });
  }

  // Register a new user
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, { email, password });
  }

  // Protected GET request with token
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  setToken(token: string): void {
    this.jwtToken = token;
  }

  getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
