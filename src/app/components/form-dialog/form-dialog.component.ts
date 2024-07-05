import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostListener,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TaskDetails } from "../../services/task.service";

@Component({
  selector: "app-form-dialog",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./form-dialog.component.html",
  styleUrl: "./form-dialog.component.scss",
})
export class FormDialogComponent implements OnChanges {
  /**
   * Textarea input element reference
   */
  @ViewChild("textareaInput")
  textareaInput!: ElementRef<HTMLTextAreaElement>;

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
      priority: ["medium"],
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
   * Focus the textarea in the dialog form
   */
  ngAfterViewInit(): void {
    if (this.textareaInput) {
      this.textareaInput.nativeElement.focus();
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

  /**
   * HostListener to listen for key events to close the dialog box
   * @param event - Key event
   */
  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.onClose();
    }
  }
}
