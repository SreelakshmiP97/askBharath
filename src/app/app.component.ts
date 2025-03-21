import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Ask Bharath';
  logoPath = 'assets/images/logo.png';
  
  ngOnInit() {
    // Initialize any app-wide services or settings here
  }
  
  ngAfterViewInit() {
    this.setupMobileMenu();
  }
  
  private setupMobileMenu() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const menuToggle = document.getElementById('menu-open');
      const navMenu = document.getElementById('nav-menu');
      
      if (!menuToggle || !navMenu) return;
      
      // Ensure menu is closed on initial load
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Toggle menu on hamburger click
      menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu(menuToggle, navMenu);
      });
      
      // Close menu when links are clicked
      const navLinks = document.querySelectorAll('#nav-menu a');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // Don't prevent default here to allow navigation
          this.closeMenu(menuToggle, navMenu);
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(target) && 
            !menuToggle.contains(target)) {
          this.closeMenu(menuToggle, navMenu);
        }
      });
    }, 100); // Slightly longer timeout to ensure DOM is ready
  }
  
  // Helper method to toggle menu state
  private toggleMenu(menuToggle: HTMLElement, navMenu: HTMLElement) {
    const isMenuOpen = navMenu.classList.contains('active');
    
    if (isMenuOpen) {
      this.closeMenu(menuToggle, navMenu);
    } else {
      this.openMenu(menuToggle, navMenu);
    }
  }
  
  // Helper method to open menu
  private openMenu(menuToggle: HTMLElement, navMenu: HTMLElement) {
    menuToggle.classList.add('active');
    navMenu.classList.add('active');
    document.body.classList.add('menu-open');
  }
  
  // Helper method to close menu
  private closeMenu(menuToggle: HTMLElement, navMenu: HTMLElement) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
}
