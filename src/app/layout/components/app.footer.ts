import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "./animatedcontainer";
import { twMerge } from "tailwind-merge";
import { CirclePattern } from "./circlepattern";
import { AppLogo } from "./app.logo";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    CirclePattern,
    AppLogo,
    RouterLink,
  ],
  template: `
    <animated-container>
      <footer [ngClass]="noContainer ? '' : 'container'">
        <div
          [ngClass]="
            twMerge(
              'w-full px-5 pt-5 lg:pt-[5.5rem] pb-10 rounded-3xl lg:rounded-4xl overflow-hidden relative',
              image || transparent
                ? 'shadow-none'
                : 'bg-main-gradient shadow-black-card',
              className
            )
          "
        >
          <ng-content></ng-content>
          <ng-container *ngIf="image && !transparent">
            <div
              class="absolute -z-1 inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_49%,rgba(0,0,0,0.00)_100%)]"
            ></div>
            <img
              class="object-cover -z-2 absolute w-full h-full top-0 bottom-0 left-0 right-0"
              [src]="image"
              alt="Footer Image"
            />
            <circle-pattern
              *ngIf="!transparent"
              className="absolute -bottom-12 opacity-50 translate-y-1/2 w-[50rem] lg:w-[80rem] -translate-x-1/2 left-1/2"
            />
          </ng-container>

          <div class="max-w-[64rem] mx-auto flex lg:flex-row flex-col">
            <div
              class="flex-1 flex flex-col justify-between gap-4 py-4 lg:px-0 px-4"
            >
              <a to="/" class="inline-block">
                <app-logo />
              </a>
              <div class="flex flex-col items-start gap-3 mt-4">
                <img src="/real-broker-logo.png" alt="Real Broker logo" class="w-36 h-auto" />
                <img src="/fair-housing-realtor.png" alt="Equal housing and Realtor logos" class="w-24 h-auto filter invert brightness-200" />
              </div>
              <div class="hidden lg:flex items-center gap-2 mt-4">
                <a
                  *ngFor="let social of socials"
                  [href]="social.link"
                  target="_blank"
                  class="h-8 px-4 cursor-pointer flex items-center justify-center rounded-full 
           text-surface-0 border border-white/12 
           bg-white/4 hover:bg-white/12 transition-all"
                >
                  <i [ngClass]="[social.icon, '!text-sm']"></i>
                </a>
              </div>
            </div>

            <div
              class="flex flex-wrap items-start justify-between gap-x-28 gap-y-7"
            >
              <div
                *ngFor="let data of footerNavsData"
                class="p-2 flex flex-col gap-2"
              >
                <div class="px-3 py-2 text-surface-0 text-xl font-medium">
                  {{ data.title }}
                </div>
                <div class="flex flex-col gap-2">
                  <a
                    *ngFor="let item of data.items"
                    [routerLink]="item.to"
                    class="px-3 py-2 w-fit text-white/72 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    {{ item.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:hidden flex items-center justify-center gap-2 mt-52">
            <a
              *ngFor="let item of socials"
              [href]="item.link"
              target="_blank"
              class="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full text-surface-0 backdrop-blur-sm border border-white/12 bg-white/4 hover:bg-white/12 transition-all"
            >
              <i [ngClass]="[item.icon, 'text-sm']"></i>
            </a>
          </div>

          <div
            class="w-full lg:w-[calc(100%-5rem)] mt-8 lg:mt-32 pt-10 flex items-center justify-between text-surface-0 border-t border-dashed border-white/10"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-md p-1 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
                <img src="/alx.png" alt="ALX Systems" class="w-20 h-auto block" />
              </div>
              <div class="text-sm text-white">
                Website Design by
                <a
                  href="https://alxsystem.com/schedule-audit"
                  target="_blank"
                  class="underline ml-2 text-white"
                  >ALX Systems</a
                >
              </div>
            </div>

            <div class="text-sm">Copyright &#64; 2026 | <a [routerLink]="'/privacy-policy'" class="underline">Privacy Policy</a></div>
          </div>
        </div>
      </footer>
    </animated-container>
  `,
})
export class AppFooter {
  @Input() noContainer?: boolean;
  @Input() className?: string;
  @Input() image?: string;
  @Input() transparent?: boolean;
  twMerge = twMerge;

  socials = [
    { icon: "pi pi-instagram", link: "https://instagram.com" },
    { icon: "pi pi-facebook", link: "https://facebook.com" },
  ];

  footerNavsData = [
    {
      title: "Explore",
      items: [
        { label: "Real Estate", to: "/real-estate" },
        { label: "Buy", to: "/buy" },
        { label: "Sell", to: "/sell" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", to: "/second-pages/about" },
        { label: "Contact", to: "/second-pages/contact" },
        { label: "Get Started", to: "/get-started" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Sign Up", to: "/second-pages/signup" },
        { label: "Sign In", to: "/second-pages/signin" },
      ],
    },
  ];
}
