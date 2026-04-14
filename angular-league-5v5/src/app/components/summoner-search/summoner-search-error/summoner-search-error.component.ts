import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-summoner-search-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      class="error-banner"
      [class.error-hide]="hiding"
      role="alert"
      aria-live="assertive"
    >
      <div class="error-icon">!</div>
      <div class="error-content">
        <h5 class="error-title">Search failed</h5>
        <p class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 0.75rem;
      }

      .error-banner {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.9rem 1rem;
        border: 1px solid rgba(239, 68, 68, 0.28);
        border-radius: 14px;
        background: linear-gradient(
          180deg,
          rgba(127, 29, 29, 0.18),
          rgba(127, 29, 29, 0.1)
        );
        color: #fecaca;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(8px);
        opacity: 1;
        transform: translateY(0);
        transition:
          opacity 250ms ease,
          transform 250ms ease;
      }

      .error-hide {
        opacity: 0;
        transform: translateY(-6px);
      }

      .error-icon {
        /* isti stil kao prije */
      }
      .error-content {
        min-width: 0;
      }
      .error-title {
        margin: 0 0 0.2rem 0;
        font-size: 0.9rem;
        line-height: 1.2;
        font-weight: 700;
        color: #fff5f5;
      }
      .error-message {
        margin: 0;
        font-size: 0.85rem;
        line-height: 1.45;
        color: #fecaca;
      }
    `,
  ],
})
export class SummonerSearchErrorComponent {
  visible = false;
  hiding = false;
  errorMessage = '';

  showError(message: string): void {
    this.errorMessage = message;
    this.visible = true;
    this.hiding = false;

    setTimeout(() => {
      this.hiding = true;
      setTimeout(() => {
        this.visible = false;
      }, 250);
    }, 3000);
  }
}
