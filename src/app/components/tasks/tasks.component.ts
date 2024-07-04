import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, CommonModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent {
  /**
   * List of tasks
   */
  public myTasks = [
    {
      isCompleted: true,
      name: "Task 1",
    },
    {
      isCompleted: false,
      name: "Task 2",
    },
    {
      isCompleted: true,
      name: "Task 3",
    },
  ];

  /**
   * Delete tasks using its index
   * @param index - Index of tasks to delete
   */
  public deleteTask(index: number): void {
    this.myTasks.splice(index, 1);
  }
}
