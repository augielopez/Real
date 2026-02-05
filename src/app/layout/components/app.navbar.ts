import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";
import { StyleClassModule } from "primeng/styleclass";
import { AppLogo } from "./app.logo";
import { ChatPanelService } from "@/layout/service/chat-panel.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule, StyleClassModule, RouterLink, AppLogo],
  template: ` <nav
    [class]="
      twMerge(
        'flex items-center relative z-[99999] justify-between py-6 w-[calc(100%-3rem)] max-h-[75px] mx-auto border-b border-white/10 border-dashed',
        className
      )
    "
  >
    <a routerLink="/">
      <app-logo />
    </a>
    <ul class="hidden lg:flex items-center gap-9 mx-auto">
      <li
        *ngFor="let item of mainLinks"
        class="text-base font-semibold transition text-white/70 hover:text-white"
      >
        <a
          [routerLink]="item.to"
          [ngClass]="{
            'text-white': item.to === pathname,
            'text-white/70 hover:text-white': item.to !== pathname
          }"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
    <div class="hidden lg:flex items-center">
      <button (click)="openChat()" class="button-regular mr-4 inline-flex items-center gap-2">
        <i class="pi pi-sparkles"></i>
        <span>Ask Miles</span>
      </button>
    </div>
    <div class="relative lg:hidden block">
      <a
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveActiveClass="animate-fadeout"
        leaveToClass="hidden"
        [hideOnOutsideClick]="true"
        class="w-10 h-10 cursor-pointer inline-flex items-center justify-center rounded-full bg-surface-0 text-surface-950 hover:bg-surface-200"
      >
        <i class="pi pi-bars"></i>
      </a>
      <div
        class="hidden absolute top-[calc(100%+0.5rem)] max-h-96 overflow-auto left-auto !right-0 w-60 p-2 rounded-2xl shadow-blue-card flex flex-col bg-surface-0"
      >
        <div class="flex flex-col gap-2">
          <a
            *ngFor="let item of mainLinks"
            [routerLink]="item.to"
            class="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950"
          >
            {{ item.label }}
          </a>
          <button
            type="button"
            (click)="openChat()"
            class="py-2 px-3 rounded-lg font-medium text-surface-0 bg-main-gradient text-left inline-flex items-center gap-2"
          >
            <i class="pi pi-sparkles"></i>
            Ask Miles
          </button>
          <a
            routerLink="/second-pages/signin"
            class="py-2 px-3 rounded-lg font-medium text-surface-500 hover:bg-surface-200 hover:text-surface-950"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  </nav>`,
})
export class AppNavbar {
  @Input() className?: string;

  pathname: string;

  constructor(private router: Router, private chatPanel: ChatPanelService) {
    this.pathname = this.router.url;
    // keep pathname updated when routing changes so active link highlighting works
    this.router.events.subscribe(() => (this.pathname = this.router.url));
  }

  openChat() {
    this.chatPanel.open();
  }

  twMerge = twMerge;

  mainLinks = [
    { label: "About", to: "/second-pages/about" },
    { label: "Contact", to: "/second-pages/contact" },
    { label: "Get Started", to: "/get-started" },
  ];
}
