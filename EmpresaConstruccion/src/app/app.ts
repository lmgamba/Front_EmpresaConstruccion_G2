import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, RouterLinkWithHref, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EmpresaConstruccion');
  public authService = inject(AuthService); // Public para usarlo en el HTML
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
