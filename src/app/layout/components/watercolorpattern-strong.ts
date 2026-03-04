import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "watercolor-pattern-strong",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="className" class="pointer-events-none">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
        <defs>
          <filter id="f1s" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="60" result="b" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0" />
          </filter>
          <linearGradient id="gs1" x1="0" x2="1">
            <stop offset="0" stop-color="#34d399" stop-opacity="0.42" />
            <stop offset="1" stop-color="#10b981" stop-opacity="0.18" />
          </linearGradient>
          <linearGradient id="gs2" x1="0" x2="1">
            <stop offset="0" stop-color="#60a5fa" stop-opacity="0.36" />
            <stop offset="1" stop-color="#6366f1" stop-opacity="0.10" />
          </linearGradient>
        </defs>

        <g filter="url(#f1s)">
          <ellipse cx="220" cy="200" rx="360" ry="160" fill="url(#gs1)" />
          <ellipse cx="520" cy="120" rx="420" ry="180" fill="url(#gs2)" transform="rotate(-8 520 120)" />
          <ellipse cx="900" cy="220" rx="280" ry="130" fill="url(#gs1)" transform="rotate(6 900 220)" />
        </g>

        <g opacity="0.08">
          <path d="M0 420 C200 340, 400 500, 600 440 C800 380, 1000 520, 1200 440 L1200 600 L0 600 Z" fill="#ffffff" />
        </g>
      </svg>
    </div>
  `,
})
export class WatercolorPatternStrong {
  @Input() className?: string;
}

