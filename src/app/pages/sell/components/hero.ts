import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppNavbar } from "@/layout/components/app.navbar";
import { SellEstimator } from "./hero-estimator";

@Component({
  selector: "sell-hero",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, AppNavbar, SellEstimator],
  template: `
    <animated-container [className]="isWide() ? 'relative h-[56rem] lg:h-[65rem]' : 'pt-6'">
      <div *ngIf="isWide()" class="absolute w-full h-[calc(100%-6rem)] top-0 left-0">
        <img class="w-full h-full object-cover absolute inset-0 -z-2" src="/pages/sell/sell.png" alt="Sell Hero Background" />
        <div class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.35)_100%)]"></div>
      </div>

      <div class="container">
        <div [ngClass]="{ 'h-[50rem] lg:h-[44rem] relative': true }">
          <app-navbar className="bg-black/40 rounded-full px-4 py-2" />
          <div class="lg:mt-16 lg:ml-24 mt-10 px-6 lg:px-0">
            <h1 class="title !text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-4xl lg:text-6xl leading-tight max-w-3xl">
              Sell Your Home
            </h1>
            <p class="mt-6 description !text-white max-w-lg drop-shadow-md">
              Ready to sell? We’ll help you market your property and secure the best offer.
            </p>

            <div class="mt-8 lg:mt-16 flex justify-center">
              <sell-estimator></sell-estimator>
            </div>
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class SellHero {
  layoutService = inject(LayoutService);
  isWide = computed(() => this.layoutService.isWide());
}

