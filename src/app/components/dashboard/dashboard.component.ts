import { Component } from "@angular/core";
import { TaskDetails, TaskService } from "../../services/task.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  /**
   * Stats information of tasks in tasklist
   */
  public statsInfo = {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionPercentage: 0,
  };

  /**
   * Subscription for receiving latest tasklist
   */
  private taskListSubscription: Subscription | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskListSubscription = this.taskService.taskList$.subscribe(
      (tasks) => {
        this.calculateTaskStats(tasks);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.taskListSubscription) {
      this.taskListSubscription.unsubscribe();
    }
  }

  /**
   * Mathematically calculate the stats information from tasklist
   * @param taskList - List of all tasks
   */
  private calculateTaskStats(taskList: TaskDetails[]): void {
    // Total tasks
    this.statsInfo.totalTasks = taskList.length;

    // Completed tasks
    this.statsInfo.completedTasks = taskList.filter(
      (task) => task.isCompleted
    ).length;

    // Pending tasks
    this.statsInfo.pendingTasks =
      this.statsInfo.totalTasks - this.statsInfo.completedTasks;

    // Completion percentage
    this.statsInfo.completionPercentage =
      this.statsInfo.totalTasks > 0
        ? (this.statsInfo.completedTasks / this.statsInfo.totalTasks) * 100
        : 0;
    this.statsInfo.completionPercentage = Math.round(
      this.statsInfo.completionPercentage
    );
  }
}
