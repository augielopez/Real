import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellHero } from "./components/hero";
import { SellProcess } from "./components/sell-process";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "sell-page",
  standalone: true,
  imports: [CommonModule, SellHero, SellProcess, AppFooter],
  template: `
    <sell-hero></sell-hero>
    <div class="container flex flex-col gap-24 lg:gap-40 mt-24">
      <sell-process></sell-process>
      <app-footer className="mt-24" />
    </div>
  `,
})
export class SellPage {}

