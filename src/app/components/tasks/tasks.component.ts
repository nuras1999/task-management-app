import { CommonModule } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import { TaskDetails, TaskService } from "../../services/task.service";
import { Subscription } from "rxjs";
import { PriorityPipe } from "../../pipes/priority.pipe";

@Component({
  selector: "app-tasks",
  standalone: true,
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
  imports: [FormsModule, CommonModule, FormDialogComponent, PriorityPipe],
})
export class TasksComponent {
  /**
   * List of tasks and its details
   */
  public taskList: TaskDetails[] = [];

  /**
   * Details of the task that is to be edited
   */
  public selectedTask: TaskDetails | null = null;

  /**
   * Show/hide the dialog box component
   */
  public showDialog = false;

  /**
   * Subscription for receiving latest tasklist
   */
  private taskListSubscription: Subscription | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskListSubscription = this.taskService.taskList$.subscribe(
      (tasks) => {
        this.taskList = tasks;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.taskListSubscription) {
      this.taskListSubscription.unsubscribe();
    }
  }

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
      const index = this.taskList.findIndex(
        (t) => t.taskName === this.selectedTask?.taskName
      );
      this.taskService.updateTask(index, task);
    } else {
      // Create new task
      this.taskService.addTask(task);
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
    this.taskService.deleteTask(index);
  }

  /**
   * HostListener to listen for key events to open new task dialog box
   * @param event - Key event
   */
  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.openDialog();
    }
  }

  /**
   * Sort the tasklist in ascending/descending order
   */
  public sortTasklist(): void {
    this.taskService.sortTasksByPriority();
  }
}
