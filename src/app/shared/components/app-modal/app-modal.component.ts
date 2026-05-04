import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModalComponent {
  readonly open = input(false);
  readonly title = input('');

  readonly close = output<void>();

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.requestClose();
    }
  }

  requestClose(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.requestClose();
    }
  }
}
