import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';  // Ensure PLATFORM_ID is imported
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';  // Import for SSR detection
import { NgFor , NgIf} from '@angular/common';  // Import NgFor to use in the standalone component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor,NgIf],  // Import NgFor here since it's a standalone component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
  users: any[] = [];  // Initialize users as an empty array
  isBrowser = false;  // Track whether it's the browser
  loading = true;      // Track if data is still loading

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID correctly
  ) {
    this.isBrowser = isPlatformBrowser(platformId);  // Check if it's the browser
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Only fetch data in the browser (not SSR)
      this.http.get<any[]>('http://localhost:5000/api/users').subscribe({
        next: (response) => {
          this.users = response;
          this.loading = false;  // Set loading to false when data is fetched
        },
        error: (error) => console.log(error),
        complete: () => console.log('Request has completed'),
      });
    }
  }

  trackByUserId(index: number, user: any): number {
    return user.id;  // Track by user.id to optimize rendering
  }
}


