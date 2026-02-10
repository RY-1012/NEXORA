import { Component, Input } from '@angular/core';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  OUTLINE = 'outline'
}

@Component({
  selector: 'nex-button',
  standalone: true,
  template: `
    <button
      [class]="buttonClass"
      [disabled]="disabled"
      type="button"
      class="
        px-4 py-2 rounded-lg font-medium transition-all duration-200 
        transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      "
    >
      <ng-content />
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = ButtonVariant.PRIMARY;
  @Input() disabled: boolean = false;

  get buttonClass(): string {
    const baseClass = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95';
    
    switch (this.variant) {
      case ButtonVariant.PRIMARY:
        return `${baseClass} bg-[color:var(--accent-1)] text-[color:var(--bg-0)] hover:brightness-110 focus:ring-[color:var(--accent-2)]`;
      case ButtonVariant.SECONDARY:
        return `${baseClass} bg-[color:var(--bg-2)] text-[color:var(--text-1)] hover:brightness-110 focus:ring-[color:var(--accent-2)]`;
      case ButtonVariant.DANGER:
        return `${baseClass} bg-red-500 text-white hover:bg-red-600 focus:ring-red-400`;
      case ButtonVariant.OUTLINE:
        return `${baseClass} border-2 border-[color:var(--border)] text-[color:var(--text-1)] hover:bg-[color:var(--bg-2)] focus:ring-[color:var(--accent-2)]`;
      default:
        return baseClass;
    }
  }
}

