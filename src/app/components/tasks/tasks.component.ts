import { Component } from "@angular/core";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent {
  /**
   * List of tasks
   */
  public myTasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];
}
