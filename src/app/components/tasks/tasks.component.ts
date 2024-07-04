import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";

/**
 * Interface for Task details
 */
export interface TaskDetails {
  isCompleted: boolean;
  taskName: string;
}

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, CommonModule, FormDialogComponent],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent {
  /**
   * List of sample default tasks
   */
  public myTasks: TaskDetails[] = [
    {
      isCompleted: true,
      taskName: "Task 1",
    },
    {
      isCompleted: false,
      taskName: "Task 2",
    },
    {
      isCompleted: false,
      taskName: "Task 3",
    },
    {
      isCompleted: true,
      taskName: "Task 4",
    },
    {
      isCompleted: false,
      taskName: "Task 5",
    },
  ];

  /**
   * Details of the task that is to be edited
   */
  public selectedTask: TaskDetails | null = null;

  /**
   * Show/hide the dialog box component
   */
  public showDialog = false;

  /**
   * Show/hide the dialog box component with new/existing data
   * @param task - Task details that is to be edited
   */
  public openDialog(task?: TaskDetails | undefined) {
    this.selectedTask = task || null;
    this.showDialog = true;
  }

  /**
   * Add/update the task list with latest data from dialog box
   * @param task - New/Updated task detail
   */
  public saveTask(task: TaskDetails): void {
    if (this.selectedTask) {
      // Edit existing task
      const index = this.myTasks.findIndex(
        (t) => t.taskName === this.selectedTask?.taskName
      );
      this.myTasks.splice(index, 1, task);
    } else {
      // Create new task
      this.myTasks.push(task);
    }
    this.closeDialog();
  }

  /**
   * Hide the form input dialog box
   */
  public closeDialog(): void {
    this.showDialog = false;
    this.selectedTask = null;
  }

  /**
   * Delete tasks using its index
   * @param index - Index of tasks to delete
   */
  public deleteTask(index: number): void {
    this.myTasks.splice(index, 1);
  }
}
