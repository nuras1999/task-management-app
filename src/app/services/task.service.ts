import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * Interface for Task details
 */
export interface TaskDetails {
  isCompleted: boolean;
  taskName: string;
  priority: "high" | "medium" | "low";
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  /**
   * Default list of tasks
   */
  private taskList: TaskDetails[] = [
    {
      taskName: "Interview candidates for Document360 frontend team",
      isCompleted: false,
      priority: "high",
    },
    {
      taskName:
        "Have to document the developer documentation of Document360 product",
      isCompleted: false,
      priority: "medium",
    },
    {
      taskName: "Plan team lunch and team outing",
      isCompleted: false,
      priority: "low",
    },
    {
      taskName: "Update the time sheet for current week",
      isCompleted: true,
      priority: "medium",
    },
  ];

  /**
   * BehaviorSubject to receive updates from task list
   */
  private taskListSubject = new BehaviorSubject<TaskDetails[]>(this.taskList);
  taskList$ = this.taskListSubject.asObservable();

  /**
   * Add the new task to task list
   * @param task - New task that is added to task list
   */
  public addTask(task: TaskDetails): void {
    this.taskList = [...this.taskList, task];
    this.taskListSubject.next(this.taskList);
  }

  /**
   * Update the existing task in the task list
   * @param index - Index of task to update
   * @param updatedTask - Updated task details
   */
  public updateTask(index: number, updatedTask: TaskDetails): void {
    this.taskList[index] = updatedTask;
    this.taskListSubject.next(this.taskList);
  }

  /**
   * Delete a task from the list of tasks
   * @param index - The index of the task to delete
   */
  public deleteTask(index: number): void {
    this.taskList.splice(index, 1);
    this.taskListSubject.next(this.taskList);
  }
}
