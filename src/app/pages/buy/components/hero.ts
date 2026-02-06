import { Component, computed, inject, Output, EventEmitter } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { PropertiesSearch, PropertyFilters } from "./properties-search";
import { MiniIntake } from "./mini-intake";

@Component({
  selector: "buy-hero",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AppNavbar, PropertiesSearch, MiniIntake],
  template: `
    <animated-container [className]="isWide() ? 'relative h-[56rem] lg:h-[65rem]' : 'pt-6'">
      <div *ngIf="isWide()" class="absolute w-full h-[calc(100%-6rem)] top-0 left-0">
        <img class="w-full h-full object-cover absolute inset-0 -z-2" src="/pages/buy/buy.png" alt="Buy Hero Background" />
        <div class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.35)_100%)]"></div>
      </div>

      <div class="container">
        <div [ngClass]="{ 'h-[50rem] lg:h-[44rem] relative': true }">
          <app-navbar className="bg-black/40 rounded-full px-4 py-2" />
          <div class="lg:mt-16 lg:ml-24 mt-10 px-6 lg:px-0">
            <h1 class="title !text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-4xl lg:text-8xl leading-tight max-w-5xl">
              Find your next home
            </h1>
            <p class="mt-6 description !text-white max-w-lg drop-shadow-md">
              Start your search below and explore properties matching your needs.
            </p>

            <div class="mt-8 lg:mt-16">
              <mini-intake (submitted)="onHeroFilters($event)"></mini-intake>
            </div>
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class BuyHero {
  layoutService = inject(LayoutService);
  isWide = computed(() => this.layoutService.isWide());

  @Output() heroFilters = new EventEmitter<PropertyFilters>();

  onHeroFilters(f: PropertyFilters) {
    this.heroFilters.emit(f);
  }

  onSearchClick() {
    // emit empty to trigger a search with current filters (search component already emits on apply)
    this.heroFilters.emit({});
  }
}

