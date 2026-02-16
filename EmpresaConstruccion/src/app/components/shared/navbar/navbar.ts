import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private authService = inject(AuthService);
  
  isLogged: boolean = false;
  userRole: string | null = null;

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isLogged = this.authService.isLogged();
    this.userRole = this.authService.getRole();
  }

  isAdmin(): boolean {
    return this.isLogged && this.userRole === 'admin';
  }

  isUser(): boolean {
    return this.isLogged && this.userRole === 'user';
  }
}

