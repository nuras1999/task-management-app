import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  /**
   * Show/hide navigation menu for small devices
   */
  public showNavMenu = false;

  constructor(public router: Router) {}

  /**
   * Navigate to the specified route
   * @param routeName Name of the route to navigate to
   */
  public navigateTo(routeName: string): void {
    this.router.navigate([routeName]);
  }

  /**
   * Toggle show/hide icon for sidenav
   */
  public toggleNavMenu(): void {
    this.showNavMenu = !this.showNavMenu;
  }
}
