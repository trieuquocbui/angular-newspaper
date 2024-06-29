import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newspaper-reader';
  constructor(private authService:AuthService){
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.authService.authorizeToPage();
    }
  }
}
