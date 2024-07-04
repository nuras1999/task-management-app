import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor(private router: Router) {}

  /**
   * Navigate to the specified route
   * @param routeName Name of the route to navigate to
   */
  public navigateTo(routeName: string): void {
    this.router.navigate([routeName]);
  }
}
