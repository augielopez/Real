import { Component, Input } from "@angular/core";

@Component({
  selector: "IconHouseBuying",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      [class]="className"
      fill="none"
    >
      <path
        d="M20 5L5 18h3v12h8V24h6v6h8V18h3L20 5z"
        fill="url(#hb_grad)"
      />
      <path
        d="M14 22h4v6h-4v-6z"
        fill="url(#hb_grad2)"
      />
      <defs>
        <linearGradient id="hb_grad" x1="20" y1="5" x2="20" y2="30" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="hb_grad2" x1="16" y1="22" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class IconHouseBuying {
  @Input() className: any = "";
}

