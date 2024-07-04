import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TasksComponent } from "./components/tasks/tasks.component";

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "tasks", component: TasksComponent },
  { path: "**", redirectTo: "/dashboard" },
];
