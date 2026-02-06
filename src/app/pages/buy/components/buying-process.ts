import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
// AnimatedContainer removed — not used in this template

@Component({
  selector: "buying-process",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="icon-box">
      </div>
      <h1
        class="px-6 mt-10 text-3xl lg:text-5xl font-semibold max-w-md mx-auto text-center text-surface-950 dark:text-surface-0 leading-tight"
      >
        The Home
        <br />
        Buying Process
      </h1>
      <p
        class="px-6 mt-6 max-w-xl mx-auto text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Here’s a high-level overview of the steps you’ll take when buying a home.
        Use this guide to understand the flow from search to close and what to expect at each stage.
      </p>

      <div class="mt-20">
        <div class="max-w-[64rem] mx-auto rounded-3xl overflow-hidden border border-surface-200 dark:border-white/12 shadow-blue-card">
          <img class="object-cover w-full h-[28rem] lg:h-[34rem]" src="/pages/buy/buyingprocess.png" alt="Home buying process overview" />
        </div>
      </div>
    </div>
  `,
})
export class BuyingProcess {}

