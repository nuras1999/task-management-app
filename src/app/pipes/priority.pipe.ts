import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "priority",
  standalone: true,
})
export class PriorityPipe implements PipeTransform {
  transform(priority: string): string {
    let className = "";
    switch (priority) {
      case "low":
        className = "priority-pill low-priority";
        break;
      case "medium":
        className = "priority-pill medium-priority";
        break;
      case "high":
        className = "priority-pill high-priority";
        break;
      default:
        className = "priority-pill default-priority";
        break;
    }
    return className;
  }
}
