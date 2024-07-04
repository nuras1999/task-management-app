import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TaskDetails } from "../tasks/tasks.component";

@Component({
  selector: "app-form-dialog",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./form-dialog.component.html",
  styleUrl: "./form-dialog.component.scss",
})
export class FormDialogComponent implements OnChanges {
  /**
   * Existing Task details that is to be edited
   */
  @Input() task: TaskDetails | null = null;

  /**
   * Event emitter for emitting new/updated value
   */
  @Output() save = new EventEmitter<TaskDetails>();

  /**
   * Event emitter for closing dialog box
   */
  @Output() close = new EventEmitter<void>();

  /**
   * Form group for task details validation
   */
  public taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ["", Validators.required],
    });
  }

  /**
   * Update form with existing details while editing
   */
  ngOnChanges(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  /**
   * Emit form value to parent component
   */
  public onSubmit(): void {
    if (this.taskForm.valid) {
      let newValue: TaskDetails = this.taskForm.value;
      newValue["isCompleted"] = false;
      this.save.emit(newValue);
    }
  }

  /**
   * Emit the close dialog confirmation to parent component
   */
  public onClose(): void {
    this.close.emit();
  }
}
