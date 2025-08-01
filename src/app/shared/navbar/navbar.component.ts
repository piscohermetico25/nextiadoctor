import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService, CurrentUser } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuCollapsed = true;
  isAuthenticated = false;
  currentUser: CurrentUser | null = null;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = user !== null;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  getUserInitials(): string {
    return this.authService.getUserInitials();
  }

  getUserTypeLabel(): string {
    return this.authService.getUserTypeLabel();
  }

  getUserTypeIcon(): string {
    return this.authService.getUserTypeIcon();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
