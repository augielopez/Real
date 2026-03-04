import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "watercolor-pattern",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="className" class="pointer-events-none">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
        <defs>
          <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" result="b" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" />
          </filter>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stop-color="#2dd4bf" stop-opacity="0.18" />
            <stop offset="1" stop-color="#34d399" stop-opacity="0.06" />
          </linearGradient>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0" stop-color="#60a5fa" stop-opacity="0.14" />
            <stop offset="1" stop-color="#7c3aed" stop-opacity="0.04" />
          </linearGradient>
          <linearGradient id="g3" x1="0" x2="1">
            <stop offset="0" stop-color="#f97316" stop-opacity="0.12" />
            <stop offset="1" stop-color="#f59e0b" stop-opacity="0.03" />
          </linearGradient>
        </defs>

        <!-- soft watercolor blobs -->
        <g filter="url(#f1)">
          <ellipse cx="200" cy="180" rx="260" ry="120" fill="url(#g1)" />
          <ellipse cx="520" cy="120" rx="320" ry="140" fill="url(#g2)" transform="rotate(-10 520 120)" />
          <ellipse cx="880" cy="200" rx="240" ry="110" fill="url(#g3)" transform="rotate(6 880 200)" />
        </g>

        <!-- subtle texture overlay (very light) -->
        <g opacity="0.06">
          <path d="M0 400 C200 320, 400 480, 600 420 C800 360, 1000 500, 1200 420 L1200 600 L0 600 Z" fill="#ffffff" />
        </g>
      </svg>
    </div>
  `,
})
export class WatercolorPattern {
  @Input() className?: string;
}

