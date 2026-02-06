import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "sell-process",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="icon-box">
      </div>
      <h1
        class="px-6 mt-10 text-3xl lg:text-5xl font-semibold max-w-md mx-auto text-center text-surface-950 dark:text-surface-0 leading-tight"
      >
        The Home Selling Process
      </h1>
      <p
        class="px-6 mt-6 max-w-xl mx-auto text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Selling a home can feel complex — here are the main steps we guide you through,
        from preparing your property to closing the sale. Follow these stages to get
        the best outcome with minimal stress.
      </p>

      <div class="mt-20">
        <div class="max-w-[64rem] mx-auto rounded-3xl overflow-hidden border border-surface-200 dark:border-white/12 shadow-blue-card">
          <img class="object-contain w-full h-auto" src="/pages/sell/sell-process.png" alt="Home selling process overview" />
        </div>
      </div>
    </div>
  `,
})
export class SellProcess {}

