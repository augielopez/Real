import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!--
    OLD LOGO (commented out)
    ======================

    <svg
      [class]="twMerge('h-8 w-fit text-white', className)"
      viewBox="0 0 360 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Augie Lopez"
      role="img"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 36 L40 18 L60 36" />
        <path d="M26 36 V52 H54 V36" />
        <path d="M40 52 V40" />
      </g>

      <text
        x="80"
        y="45"
        fill="currentColor"
        font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        font-size="28"
        font-weight="800"
        letter-spacing="1"
      >
        AUGIE LOPEZ
      </text>
    </svg>
    -->

    <!-- NEW WHITE LOGO -->
    <svg
      [class]="twMerge('h-8 w-fit', className)"
      viewBox="0 0 516.92 218.06"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Augie Lopez"
      role="img"
    >
      <defs>
        <style>
          .cls-1 {
            fill: #fff;
          }
        </style>
      </defs>

      <g class="cls-1">
        <polygon points="154.84 90.7 142.06 109.6 102.55 41.08 23.68 177.88 0 177.88 90.71 20.54 102.55 0 114.39 20.54 154.84 90.7"/>
        <polygon points="173.97 123.88 141.15 123.88 146.08 116.59 158.86 97.69 173.97 123.88"/>
        <rect x="86.85" y="99.61" width="13.66" height="13.67"/>
        <rect x="104.52" y="99.61" width="13.67" height="13.67"/>
        <rect x="86.85" y="117.05" width="13.66" height="13.66"/>
        <rect x="104.52" y="117.05" width="13.67" height="13.66"/>

        <path d="M298.51,141.51v75.05h12.75V193.34H336.6a25.13,25.13,0,0,0,25.13-25.13v-1.57a25.13,25.13,0,0,0-25.13-25.13Zm35.58,40.87H311.26V152.6h22.83A14.89,14.89,0,0,1,349,167.49h0A14.89,14.89,0,0,1,334.09,182.38Z"/>
        <polygon points="191.85 205.47 191.85 216.56 138.27 216.56 138.27 141.51 151.02 141.51 151.02 205.47 191.85 205.47"/>
        <polygon points="391.13 152.6 391.13 173.44 431.1 173.44 431.1 183.72 391.13 183.72 391.13 205.47 434.63 205.47 434.63 216.56 378.38 216.56 378.38 141.51 434.63 141.51 434.63 152.6 391.13 152.6"/>
        <polygon points="515.3 152.6 468.96 205.47 516.92 205.47 516.92 216.56 452.26 216.56 452.26 206.65 453.28 205.47 499.07 152.6 452.26 152.6 452.26 141.51 516.92 141.51 516.92 150.76 515.3 152.6"/>

        <path d="M251.88,141.51a48.5,48.5,0,0,0-23.78,0c-17.67,4.65-28.25,19.69-28.25,37.54s10.57,32.84,28.19,37.51a48.35,48.35,0,0,0,23.9,0c17.62-4.67,28.19-19.7,28.19-37.51S269.55,146.16,251.88,141.51ZM240,207.13a28.09,28.09,0,1,1,28.09-28.08A28.08,28.08,0,0,1,240,207.13Z"/>

        <path d="M248.52,42.45V90.16a30.46,30.46,0,0,1-30.46,30.46h-6.47a30.46,30.46,0,0,1-30.46-30.46V42.45h12.75v46a21,21,0,0,0,21,20.94h0a21,21,0,0,0,20.94-20.94v-46Z"/>

        <path d="M340.13,76.47v30.78s-11.73,13.37-29.87,13.37h-6.32A37.59,37.59,0,0,1,266.36,83V79.28A37.59,37.59,0,0,1,303.94,41.7H310c9.47,0,20.1,4,26.46,11.07l-.22.24-6.91,7.8c-5.3-4.5-12.61-7.8-18.26-7.8h-5.23a26.73,26.73,0,0,0-26.73,26.73v4.07a25.62,25.62,0,0,0,25.61,25.61,45.67,45.67,0,0,0,13.31-2c4.13-1.31,7.67-3.19,9.75-5.5V86.76H305.26V76.47Z"/>

        <polygon points="408.7 54.35 408.7 75.35 448.77 75.35 448.77 85.63 408.7 85.63 408.7 107.65 452.26 107.65 452.26 118.74 395.95 118.74 395.95 42.45 452.26 42.45 452.26 54.35 408.7 54.35"/>

        <rect x="360.38" y="42.45" width="12.75" height="76.29"/>
      </g>
    </svg>
  `,
})
export class AppLogo {
  @Input() className: string = "";
  @Input() withText: boolean = true;
  twMerge = twMerge;
}
